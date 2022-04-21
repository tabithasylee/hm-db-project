DROP DATABASE IF EXISTS wardrobe;
CREATE DATABASE wardrobe;
USE wardrobe;

CREATE TABLE IF NOT EXISTS articles_mega (
	article_id VARCHAR(10) NOT NULL, # All article ids are strings of 10 characters
	product_code VARCHAR(7) NOT NULL, # All product ids are strings of 10 characters
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

# We can decompose each of the "no" or "code" values further, as they correspond with the category name
CREATE TABLE IF NOT EXISTS articles_product_type (
    product_type_no INT, 
    product_type_name VARCHAR(50),
    product_group_name VARCHAR(50),
    PRIMARY KEY(product_type_no)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS articles_graphical_appearance (
	graphical_appearance_no VARCHAR(7) NOT NULL,
    graphical_appearance_name VARCHAR(50),
    PRIMARY KEY(graphical_appearance_no)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS articles_colour_group (
    colour_group_code SMALLINT,
    colour_group_name VARCHAR(50),
    PRIMARY KEY(colour_group_code)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS articles_perceived_colour_value (
    perceived_colour_value_id SMALLINT,
    perceived_colour_value_name VARCHAR(50),
    PRIMARY KEY(perceived_colour_value_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS articles_perceived_colour_master (
    perceived_colour_master_id SMALLINT,
    perceived_colour_master_name VARCHAR(50),
    PRIMARY KEY(perceived_colour_master_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS articles_perceived_department (
    department_no INT,
    department_name VARCHAR(50),
    PRIMARY KEY(department_no)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS articles_index (
    index_code VARCHAR(1),
    index_name VARCHAR(50),
    PRIMARY KEY(index_code)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS articles_index_group (
    index_group_no SMALLINT,
    index_group_name VARCHAR(50),
    PRIMARY KEY(index_group_no)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS articles_section (
    section_no SMALLINT,
    section_name VARCHAR(50),
    PRIMARY KEY(section_no)
)ENGINE=InnoDB; 

CREATE TABLE IF NOT EXISTS articles_garment_group (
    garment_group_no SMALLINT,
    garment_group_name VARCHAR(50),
    PRIMARY KEY(garment_group_no)
)ENGINE=InnoDB;

# Create new decomposed table with foreign keys to the ones above
CREATE TABLE IF NOT EXISTS articles (
	article_id VARCHAR(10) NOT NULL,
	product_code VARCHAR(7) NOT NULL,
    prod_name VARCHAR(255),
    product_type_no INT,
	graphical_appearance_no VARCHAR(7) NOT NULL,
    colour_group_code SMALLINT,
    perceived_colour_value_id SMALLINT,
    perceived_colour_master_id SMALLINT,
    department_no INT,
    index_code VARCHAR(1),
    index_group_no SMALLINT,
    section_no SMALLINT,
    garment_group_no SMALLINT,
    detail_desc VARCHAR(1000),
    PRIMARY KEY(article_id),
	CONSTRAINT fk_product_type_group FOREIGN KEY (product_type_no)
		REFERENCES articles_product_type(product_type_no)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT fk_graphical_appearance_no FOREIGN KEY (graphical_appearance_no)
		REFERENCES articles_graphical_appearance(graphical_appearance_no)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT fk_colour_group_code FOREIGN KEY (colour_group_code)
		REFERENCES articles_colour_group(colour_group_code)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT fk_perceived_colour_value_id FOREIGN KEY (perceived_colour_value_id)
		REFERENCES articles_perceived_colour_value(perceived_colour_value_id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT fk_perceived_colour_master_id FOREIGN KEY (perceived_colour_master_id)
		REFERENCES articles_perceived_colour_master(perceived_colour_master_id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT fk_department_no FOREIGN KEY (department_no)
		REFERENCES articles_perceived_department(department_no)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT fk_index_code FOREIGN KEY (index_code)
		REFERENCES articles_index(index_code)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT fk_index_group_name FOREIGN KEY (index_group_no)
		REFERENCES articles_index_group(index_group_no)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT fk_section_no FOREIGN KEY (section_no)
		REFERENCES articles_section(section_no)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT fk_garment_group_no FOREIGN KEY (garment_group_no)
		REFERENCES articles_garment_group(garment_group_no)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION
) ENGINE=InnoDB;

# customers table does not need to be decomposed further
CREATE TABLE IF NOT EXISTS customers (
	customer_id VARCHAR(64) NOT NULL,
	fn VARCHAR(1),
	active VARCHAR(1),
	club_member_status VARCHAR(10),
	fashion_news_frequency VARCHAR(10),
    age SMALLINT,
    postal_code VARCHAR(64),
    PRIMARY KEY(customer_id) 
) ENGINE=InnoDB;

# transactions table does not need to be decomposed further
CREATE TABLE IF NOT EXISTS transactions (
	transaction_id INT AUTO_INCREMENT, 
	t_dat DATE,
	customer_id VARCHAR(64) NOT NULL,
	article_id VARCHAR(10) NOT NULL,
	price DECIMAL(19, 18),
	sales_channel_id VARCHAR(1),
    PRIMARY KEY(transaction_id), 
    CONSTRAINT fk_article FOREIGN KEY(article_id)
		REFERENCES articles(article_id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT fk_customers FOREIGN KEY(customer_id)
	REFERENCES customers(customer_id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION 
) ENGINE=InnoDB;

LOAD DATA
    INFILE '/Users/alice/Documents/School/2021-2022/CS3265_Databases/project2/articles.csv'
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
    

INSERT INTO articles_product_type
(SELECT DISTINCT
	product_type_no,
    product_type_name,
    product_group_name
FROM articles_mega);

INSERT INTO articles_graphical_appearance
(SELECT DISTINCT
	graphical_appearance_no,
    graphical_appearance_name
FROM articles_mega);

INSERT INTO articles_colour_group
(SELECT DISTINCT
	colour_group_code,
    colour_group_name
FROM articles_mega);

INSERT INTO articles_perceived_colour_value
(SELECT DISTINCT
	perceived_colour_value_id,
    perceived_colour_value_name
FROM articles_mega);

INSERT INTO articles_perceived_colour_master
(SELECT DISTINCT
	perceived_colour_master_id,
    perceived_colour_master_name
FROM articles_mega);

INSERT INTO articles_perceived_department
(SELECT DISTINCT
	department_no,
    department_name
FROM articles_mega);

INSERT INTO articles_index
(SELECT DISTINCT
	index_code,
    index_name
FROM articles_mega);

INSERT INTO articles_index_group
(SELECT DISTINCT
	index_group_no,
    index_group_name
FROM articles_mega);

INSERT INTO articles_section
(SELECT DISTINCT
	section_no,
    section_name
FROM articles_mega);

INSERT INTO articles_garment_group
(SELECT DISTINCT
	garment_group_no,
    garment_group_name
FROM articles_mega);
    
INSERT INTO articles
(SELECT
	article_id,
	product_code,
    prod_name,
    product_type_no,
	graphical_appearance_no,
    colour_group_code,
    perceived_colour_value_id,
    perceived_colour_master_id,
    department_no,
    index_code,
    index_group_no,
    section_no,
    garment_group_no,
    detail_desc
FROM articles_mega);

LOAD DATA
    INFILE '/Users/alice/Documents/School/2021-2022/CS3265_Databases/project2/customers.csv'
    INTO TABLE customers
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
    SET fn = IF(@fn, "1", NULL), active = IF(@active, "1", NULL), age = IF(@age, @age, NULL);
    
LOAD DATA
    INFILE 'D:/Program_Files/wamp64/tmp/transactions.csv'
    INTO TABLE transactions
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
    )
    SET transaction_id = NULL;
    
ALTER TABLE transactions
ADD INDEX `transaction_index` (`transaction_id`, `customer_id`, `article_id`);
ALTER TABLE transactions
ADD INDEX `article_index` (`transaction_id`, `article_id`);
ALTER TABLE transactions
ADD INDEX `customer_index` (`transaction_id`, `customer_id`);
