USE wardrobe; 

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

SELECT * FROM megatable_view_name;

# Select a view of transactions corresponding to 25 random articles. 
DROP VIEW IF EXISTS transaction_view;
CREATE VIEW transaction_view
AS 
	SELECT 
		t_dat,
        customer_id,
        ROUND((price * 590), 2) as price,
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
	JOIN (SELECT * FROM articles ORDER BY RAND() LIMIT 25) AS a USING (article_id)
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

DROP VIEW IF EXISTS articles_index_view;
CREATE VIEW articles_index_view
AS 
SELECT * FROM articles_index;

DROP VIEW IF EXISTS articles_index_group_view;
CREATE VIEW articles_index_group_view
AS 
SELECT * FROM articles_index_group;

DROP VIEW IF EXISTS articles_section_view;
CREATE VIEW articles_section_view
AS 
SELECT * FROM articles_section;

DROP VIEW IF EXISTS articles_garment_group_view;
CREATE VIEW articles_garment_group_view
AS 
SELECT * FROM articles_garment_group;
