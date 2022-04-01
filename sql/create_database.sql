
DROP DATABASE IF EXISTS wardrobe;
CREATE DATABASE wardrobe;
USE wardrobe;

CREATE TABLE IF NOT EXISTS articles_mega (
	article_id VARCHAR(10) NOT NULL,
	product_code VARCHAR(7) NOT NULL,
    prod_name VARCHAR(255),
    product_type_no INT,
    product_type_name VARCHAR(50),
    product_group_name VARCHAR(50),
	graphical_appearance_no VARCHAR(7) NOT NULL,
    graphical_appearance_name VARCHAR(50),
    colour_group_code SMALLINT,
    colour_group_name VARCHAR(50),
    perceived_colour_value_id SMALLINT,
    perceived_colour_value_name VARCHAR(50),
    perceived_colour_master_id SMALLINT,
    perceived_colour_master_name VARCHAR(50),
    department_no INT,
    department_name VARCHAR(50),
    index_code VARCHAR(1),
    index_name VARCHAR(50),
    index_group_no SMALLINT,
    index_group_name VARCHAR(50),
    section_no SMALLINT,
    section_name VARCHAR(50),
    garment_group_no SMALLINT,
    garment_group_name VARCHAR(50),
    detail_desc VARCHAR(1000)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS customers_mega (
	customer_id VARCHAR(64) NOT NULL,
	fn VARCHAR(1),
	active VARCHAR(1),
	club_member_status VARCHAR(10),
	fashion_news_frequency VARCHAR(10),
    age SMALLINT,
    postal_code VARCHAR(64)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS transactions_mega (
	t_dat DATE,
	customer_id VARCHAR(64) NOT NULL,
	article_id VARCHAR(10) NOT NULL,
	price DECIMAL(19, 18),
	sales_channel_id VARCHAR(1)
) ENGINE=InnoDB;

LOAD DATA
    INFILE 'D:/Program_Files/wamp64/tmp/articles.csv'
    INTO TABLE articles_mega
    FIELDS 
        TERMINATED BY ','
        ENCLOSED BY '"'
    LINES
        TERMINATED BY '\n'
    IGNORE 1 LINES
	(
		article_id,
		product_code,
		prod_name,
		product_type_no,
		product_type_name,
		product_group_name,
		graphical_appearance_no,
		graphical_appearance_name,
		colour_group_code,
		colour_group_name,
		perceived_colour_value_id,
		perceived_colour_value_name,
		perceived_colour_master_id,
		perceived_colour_master_name,
		department_no,
		department_name,
		index_code,
		index_name,
		index_group_no,
		index_group_name,
		section_no,
		section_name,
		garment_group_no,
		garment_group_name,
        detail_desc
    );
    
LOAD DATA
    INFILE 'D:/Program_Files/wamp64/tmp/customers.csv'
    INTO TABLE customers_mega
    FIELDS 
        TERMINATED BY ','
    LINES
        TERMINATED BY '\n'
    IGNORE 1 LINES
	(
		customer_id,
		@fn,
		@active,
		club_member_status,
		fashion_news_frequency,
		@age,
		postal_code
    )
    SET fn = IF(@fn, "1", NULL), active = IF(@active, "1", NULL), age = IF(@age, age, NULL);
    
LOAD DATA
    INFILE 'D:/Program_Files/wamp64/tmp/transactions.csv'
    INTO TABLE transactions_mega
    FIELDS 
        TERMINATED BY ','
    LINES
        TERMINATED BY '\n'
    IGNORE 1 LINES
	(
		t_dat,
		customer_id,
		article_id,
		price,
		sales_channel_id
    );
    
SELECT * FROM articles_mega LIMIT 100; 
SELECT * FROM transactions_mega LIMIT 100; 
SELECT * FROM customers_mega LIMIT 100; 