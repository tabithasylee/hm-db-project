

USE wardrobe; 

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

DROP PROCEDURE IF EXISTS get_customer_article_summary;
DELIMITER // 
CREATE PROCEDURE get_customer_article_summary(IN p_customer_id VARCHAR(64), IN article_field VARCHAR(64))
BEGIN
	SELECT 
	CASE article_field
		WHEN 'product_type_name' THEN product_type_name
		WHEN 'product_group_name' THEN product_group_name
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
	LEFT JOIN articles_product_type_group a2 ON article_field = 'product_group_name' and a2.product_type_no = t.product_type_no
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


DROP PROCEDURE IF EXISTS compare_customer_vs_price;
DELIMITER // 
CREATE PROCEDURE compare_customer_vs_price(IN customer_field VARCHAR(64))
BEGIN
	SELECT 
	CASE customer_field
		WHEN 'active' THEN active
		WHEN 'club_member_status' THEN club_member_status
		WHEN 'fashion_news_frequency' THEN fashion_news_frequency
		WHEN 'age' THEN age
					ELSE NULL
	  END AS translated_column,
				SUM(ROUND(price * 590, 2)) AS sum
      FROM customers
      JOIN transactions USING(customer_id)
    GROUP BY translated_column
    ORDER BY sum ASC;
    
END // 
DELIMITER ;

CALL compare_customer_vs_price("fashion_news_frequency");

-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "product_type_name");
-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "product_group_name");
-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "graphical_appearance_name");
-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "colour_group_name");
-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "garment_group_name");
-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "department_name");
-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "perceived_colour_master_name");
-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "perceived_colour_value_name");


