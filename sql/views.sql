USE wardrobe; 

<<<<<<< HEAD
# Relink the articles table with the decomposed table containing the type names. Does not include code information.
DROP VIEW IF EXISTS megatable_view_name;
CREATE VIEW megatable_view_name
AS 
	SELECT 
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
		FROM articles
	JOIN articles_product_type USING (product_type_no)
	JOIN articles_graphical_appearance USING (graphical_appearance_no)
	JOIN articles_colour_group USING (colour_group_code)
	JOIN articles_perceived_colour_value USING (perceived_colour_value_id)
	JOIN articles_perceived_colour_master USING (perceived_colour_master_id)
	JOIN articles_perceived_department USING (department_no)
	JOIN articles_index USING (index_code)
	JOIN articles_index_group USING (index_group_no)
	JOIN articles_section USING (section_no)
	JOIN articles_garment_group USING (garment_group_no);
=======
DROP PROCEDURE IF EXISTS get_customer_transactions;
DELIMITER // 
CREATE PROCEDURE get_customer_transactions(IN p_customer_id VARCHAR(64))
BEGIN
	# Note that the price is scaled by 590 in the original dataset for privacy reasons, so when displaying we unscale it.
	SELECT prod_name, ROUND((price * 590), 2) AS price FROM transactions 
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
                    COUNT(*) AS count
      FROM transactions
      JOIN articles AS t USING(article_id) 
	LEFT JOIN articles_product_type a1 ON article_field = 'product_type_name' and a1.product_type_no = t.product_type_no
	-- LEFT JOIN articles_product_type_group a2 ON article_field = 'product_group_name' and a2.product_type_no = t.product_type_no
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
>>>>>>> fdfc2beb241022ef863d0635ece398893adf10ca

SELECT * FROM megatable_view_name;

# Select a view of 50 random transactions and the corresponding article information. 
DROP VIEW IF EXISTS transaction_view;
CREATE VIEW transaction_view
AS 
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
	JOIN (SELECT * FROM articles ORDER BY RAND() LIMIT 50) AS a USING (article_id)
	JOIN articles_product_type USING (product_type_no)
	JOIN articles_graphical_appearance USING (graphical_appearance_no)
	JOIN articles_colour_group USING (colour_group_code)
	JOIN articles_perceived_colour_value USING (perceived_colour_value_id)
	JOIN articles_perceived_colour_master USING (perceived_colour_master_id)
	JOIN articles_perceived_department USING (department_no)
	JOIN articles_index USING (index_code)
	JOIN articles_index_group USING (index_group_no)
	JOIN articles_section USING (section_no)
	JOIN articles_garment_group USING (garment_group_no);

SELECT * FROM transaction_view;

# Returning all the possible values of the decomposed tables, since we need it in the frontend
DROP VIEW IF EXISTS articles_product_type_view;
CREATE VIEW articles_product_type_view
AS 
SELECT * FROM articles_product_type;

DROP VIEW IF EXISTS articles_graphical_appearance_view;
CREATE VIEW articles_graphical_appearance_view
AS 
SELECT * FROM articles_graphical_appearance;

DROP VIEW IF EXISTS articles_colour_group_view;
CREATE VIEW articles_colour_group_view
AS 
SELECT * FROM articles_colour_group;

DROP VIEW IF EXISTS articles_perceived_colour_value_view;
CREATE VIEW articles_perceived_colour_value_view
AS 
SELECT * FROM articles_perceived_colour_value;

DROP VIEW IF EXISTS articles_perceived_colour_master_view;
CREATE VIEW articles_perceived_colour_master_view
AS 
SELECT * FROM articles_perceived_colour_master;

DROP VIEW IF EXISTS articles_perceived_department_view;
CREATE VIEW articles_perceived_department_view
AS 
SELECT * FROM articles_perceived_department;

<<<<<<< HEAD
DROP VIEW IF EXISTS articles_index_view;
CREATE VIEW articles_index_view
AS 
SELECT * FROM articles_index;

DROP VIEW IF EXISTS articles_index_group_view;
CREATE VIEW articles_index_group_view
AS 
SELECT * FROM articles_index_group;
=======
-- CALL compare_customer_vs_price("fashion_news_frequency");

CALL get_customer_transactions("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657");

CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "product_type_name");
CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "product_group_name");
-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "graphical_appearance_name");
-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "colour_group_name");
-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "garment_group_name");
-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "department_name");
-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "perceived_colour_master_name");
-- CALL get_customer_article_summary("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfc657", "perceived_colour_value_name");
>>>>>>> fdfc2beb241022ef863d0635ece398893adf10ca

DROP VIEW IF EXISTS articles_section_view;
CREATE VIEW articles_section_view
AS 
SELECT * FROM articles_section;

DROP VIEW IF EXISTS articles_garment_group_view;
CREATE VIEW articles_garment_group_view
AS 
SELECT * FROM articles_garment_group;
