USE wardrobe; 

# Given a customer id, use this procedure to get all of their transactions. 
DROP PROCEDURE IF EXISTS get_customer_transactions;
DELIMITER // 
CREATE PROCEDURE get_customer_transactions(IN p_customer_id VARCHAR(64))
BEGIN
	# Note that the price is scaled by 590 in the original dataset for privacy reasons, so when displaying we unscale it.
	SELECT prod_name, ROUND((price * 590), 2) FROM transactions 
	JOIN articles USING(article_id)
	WHERE customer_id = p_customer_id;
END // 
DELIMITER ;

CALL get_customer_transactions("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657");

# Given a customer_id and a specific article field,
# We can see how many of each article field a customer has purchased. 
DROP PROCEDURE IF EXISTS get_customer_article_summary;
DELIMITER // 
CREATE PROCEDURE get_customer_article_summary(IN p_customer_id VARCHAR(64), IN article_field VARCHAR(64))
BEGIN
	SELECT 
	CASE article_field
		WHEN 'product_type_name' THEN product_type_name
		WHEN 'graphical_appearance_name' THEN graphical_appearance_name
		WHEN 'colour_group_name' THEN colour_group_name
		WHEN 'perceived_colour_value_name' THEN perceived_colour_value_name
		WHEN 'perceived_colour_master_name' THEN perceived_colour_master_name
		WHEN 'department_name' THEN department_name
		WHEN 'section_name' THEN section_name
		WHEN 'garment_group_name' THEN garment_group_name
					ELSE NULL
	  END AS translated_column,
                    COUNT(*)
      FROM transactions
      JOIN articles AS t USING(article_id) 
	LEFT JOIN articles_product_type a1 ON article_field = 'product_type_name' and a1.product_type_no = t.product_type_no
	LEFT JOIN articles_graphical_appearance a3 ON article_field = 'graphical_appearance_name' and a3.graphical_appearance_no = t.graphical_appearance_no
	LEFT JOIN articles_colour_group a4 ON article_field = 'colour_group_name' and a4.colour_group_code = t.colour_group_code
	LEFT JOIN articles_perceived_colour_value a5 ON article_field = 'perceived_colour_value_name' and a5.perceived_colour_value_id = t.perceived_colour_value_id
	LEFT JOIN articles_perceived_colour_master a6 ON article_field = 'perceived_colour_master_name' and a6.perceived_colour_master_id = t.perceived_colour_master_id
	LEFT JOIN articles_perceived_department a7 ON article_field = 'department_name' and a7.department_no = t.department_no
	LEFT JOIN articles_section a8 ON article_field = 'section_name' and a8.section_no = t.section_no
	LEFT JOIN articles_garment_group a9 ON article_field = 'garment_group_name' and a9.garment_group_no = t.garment_group_no
	WHERE customer_id = p_customer_id
    GROUP BY translated_column;
END // 
DELIMITER ;

CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "product_type_name");

# For a specific article, given the article_id,
# This returns the aggregate of the demographic of the customer that purchased that item.
# So for example, we can use this to see which age group, or member status is most likely to buy a strap top.
DROP PROCEDURE IF EXISTS compare_article_customer_demographic;
DELIMITER // 
CREATE PROCEDURE compare_article_customer_demographic(IN product_id VARCHAR(64), IN customer_field VARCHAR(64))
BEGIN
	SELECT 
	CASE customer_field
		WHEN 'active' THEN active
		WHEN 'club_member_status' THEN club_member_status
		WHEN 'fashion_news_frequency' THEN fashion_news_frequency
		WHEN 'age' THEN age
		WHEN 'postal_code' THEN postal_code
					ELSE NULL
	  END AS translated_column,
				COUNT(*),
                prod_name
      FROM customers
      JOIN transactions USING(customer_id)
      JOIN articles USING(article_id)
	WHERE article_id = product_id
    GROUP BY translated_column;
    
END // 
DELIMITER ;

CALL compare_article_customer_demographic("0108775015", "age");

# For a specific article, given the article_id,
# Return all the transactions that contain this item and the corresponding price information. 
DROP PROCEDURE IF EXISTS transactions_from_article;
DELIMITER // 
CREATE PROCEDURE transactions_from_article(IN product_id VARCHAR(64))
BEGIN
	SELECT 
		t_dat,
        customer_id,
        ROUND((price * 590), 2),
		article_id,
		product_code,
		prod_name,
		product_type_name,
		product_group_name,
		graphical_appearance_name,
		colour_group_name,
		perceived_colour_value_name,
		perceived_colour_master_name,
		department_name,
		index_name,
		index_group_name,
		section_name,
		garment_group_name,
		detail_desc
		FROM transactions
	JOIN (SELECT * FROM articles LIMIT 100) AS a USING (article_id)
	JOIN articles_product_type USING (product_type_no)
	JOIN articles_graphical_appearance USING (graphical_appearance_no)
	JOIN articles_colour_group USING (colour_group_code)
	JOIN articles_perceived_colour_value USING (perceived_colour_value_id)
	JOIN articles_perceived_colour_master USING (perceived_colour_master_id)
	JOIN articles_perceived_department USING (department_no)
	JOIN articles_index USING (index_code)
	JOIN articles_index_group USING (index_group_no)
	JOIN articles_section USING (section_no)
	JOIN articles_garment_group USING (garment_group_no)
    WHERE article_id = product_id
    ORDER BY price;
END // 
DELIMITER ;

CALL transactions_from_article("0108775015");