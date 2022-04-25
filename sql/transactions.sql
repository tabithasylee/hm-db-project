	USE wardrobe; 

# A transaction to insert an article
DROP PROCEDURE IF EXISTS insert_article;
DELIMITER // 
CREATE PROCEDURE insert_article(
	IN i_article_id VARCHAR(10),
	IN i_product_code VARCHAR(7),
    IN i_prod_name VARCHAR(255),
    IN i_product_type_no INT,
	IN i_graphical_appearance_no VARCHAR(7),
    IN i_colour_group_code SMALLINT,
    IN i_perceived_colour_value_id SMALLINT,
    IN i_perceived_colour_master_id SMALLINT,
    IN i_department_no INT,
    IN i_index_code VARCHAR(1),
    IN i_index_group_no SMALLINT,
    IN i_section_no SMALLINT,
    IN i_garment_group_no SMALLINT,
    IN i_detail_desc VARCHAR(1000))
BEGIN
	DECLARE sql_error INT DEFAULT FALSE; 
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET sql_error = TRUE;
    
    START TRANSACTION;
		INSERT INTO articles VALUES
		(i_article_id, i_product_code, i_prod_name, i_product_type_no, 
        i_graphical_appearance_no, i_colour_group_code, i_perceived_colour_value_id, 
        i_perceived_colour_master_id, i_department_no, i_index_code,
        i_index_group_no, i_section_no, i_garment_group_no, i_detail_desc);
        
        IF sql_error = FALSE THEN
			COMMIT;
            SELECT 'The transaction was commited.' as msg;
		ELSE
			ROLLBACK;
            SELECT 'The transaction was rolled back.' as msg;
		END IF;
END // 
DELIMITER ;

# Testing article 
CALL insert_article("0108723457", "0108775", "Strap top", 253, "1010016", 9, 4, 5, 1676, "A", 1, 16, 1002, "Testing");
SELECT * FROM articles WHERE article_id = "0108723457";

# A transaction to insert an customer
DROP PROCEDURE IF EXISTS insert_customer;
DELIMITER // 
CREATE PROCEDURE insert_customer(
	IN i_customer_id VARCHAR(64),
	IN i_fn VARCHAR(1),
	IN i_active VARCHAR(1),
	IN i_club_member_status VARCHAR(10),
	IN i_fashion_news_frequency VARCHAR(10),
    IN i_age SMALLINT,
    IN i_postal_code VARCHAR(64))
BEGIN
	DECLARE sql_error INT DEFAULT FALSE; 
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET sql_error = TRUE;
    
    START TRANSACTION;
		INSERT INTO customers VALUES
		(i_customer_id, i_fn, i_active, i_club_member_status, i_fashion_news_frequency, i_age, i_postal_code);
        
        IF sql_error = FALSE THEN
			COMMIT;
            SELECT 'The transaction was commited';
		ELSE
			ROLLBACK;
            SELECT 'The transaction was rolled back.';
		END IF;
END // 
DELIMITER ;

# Testing insert transaction
CALL insert_customer("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfd123", 1, 1, "ACTIVE", "NONE", 49, "52043ee2162cf5aa7ee79974281641c6f11a68d276429a91f8ca0d4b6efa8100");
SELECT * FROM customers WHERE customer_id = "00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfd123";

# A transaction to insert an transaction
DROP PROCEDURE IF EXISTS insert_transaction;
DELIMITER // 
CREATE PROCEDURE insert_transaction(
	IN i_t_dat DATE,
	IN i_customer_id VARCHAR(64),
	IN i_article_id VARCHAR(10),
	IN i_price DECIMAL(19, 18),
	IN i_sales_channel_id VARCHAR(1))
BEGIN
	DECLARE sql_error INT DEFAULT FALSE; 
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET sql_error = TRUE;
    
    START TRANSACTION;
		INSERT INTO transactions(
		t_dat,
		customer_id,
		article_id,
		price,
		sales_channel_id) 
        VALUES
		(i_t_dat, i_customer_id, i_article_id, i_price, i_sales_channel_id);
        
        IF sql_error = FALSE THEN
			COMMIT;
            SELECT 'The transaction was commited';
		ELSE
			ROLLBACK;
            SELECT 'The transaction was rolled back.';
		END IF;
END // 
DELIMITER ;

# Testing insert transaction
CALL insert_transaction(CAST("2018-09-20" AS DATE),"00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfd123", "0108723457", "0.12321", "2");
SELECT * FROM transactions WHERE customer_id = "00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfd123";


# A transaction to update an article
DROP PROCEDURE IF EXISTS update_article;
DELIMITER // 
CREATE PROCEDURE update_article(
	IN i_article_id VARCHAR(10),
	IN i_product_code VARCHAR(7),
    IN i_prod_name VARCHAR(255),
    IN i_product_type_no INT,
	IN i_graphical_appearance_no VARCHAR(7),
    IN i_colour_group_code SMALLINT,
    IN i_perceived_colour_value_id SMALLINT,
    IN i_perceived_colour_master_id SMALLINT,
    IN i_department_no INT,
    IN i_index_code VARCHAR(1),
    IN i_index_group_no SMALLINT,
    IN i_section_no SMALLINT,
    IN i_garment_group_no SMALLINT,
    IN i_detail_desc VARCHAR(1000))
BEGIN
	DECLARE sql_error INT DEFAULT FALSE; 
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET sql_error = TRUE;
    
    START TRANSACTION;
		UPDATE articles 
        SET article_id = i_article_id, 
        product_code = i_product_code, 
        prod_name = i_prod_name, 
        product_type_no = i_product_type_no, 
        graphical_appearance_no = i_graphical_appearance_no, 
        colour_group_code = i_colour_group_code, 
        perceived_colour_value_id = i_perceived_colour_value_id, 
        perceived_colour_master_id = i_perceived_colour_master_id, 
        department_no = i_department_no, 
        index_code = i_index_code,
        index_group_no = i_index_group_no, 
        section_no = i_section_no, 
        garment_group_no = i_garment_group_no, 
        detail_desc = i_detail_desc
        WHERE article_id = i_article_id;
        
        IF sql_error = FALSE THEN
			COMMIT;
            SELECT 'The transaction was commited';
		ELSE
			ROLLBACK;
            SELECT 'The transaction was rolled back.';
		END IF;
END // 
DELIMITER ;

# Testing update article 
CALL update_article("0108723457", "0108775", "Strap top", 253, "1010016", 9, 4, 5, 1676, "A", 1, 16, 1002, "Testing edit");
SELECT * FROM articles WHERE article_id = "0108723457";


# A transaction to update an customer
DROP PROCEDURE IF EXISTS update_customer;
DELIMITER // 
CREATE PROCEDURE update_customer(
	IN i_customer_id VARCHAR(64),
	IN i_fn VARCHAR(1),
	IN i_active VARCHAR(1),
	IN i_club_member_status VARCHAR(10),
	IN i_fashion_news_frequency VARCHAR(10),
    IN i_age SMALLINT,
    IN i_postal_code VARCHAR(64))
BEGIN
	DECLARE sql_error INT DEFAULT FALSE; 
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET sql_error = TRUE;
    
    START TRANSACTION;
		UPDATE customers SET
		fn = i_fn, 
        active = i_active, 
        club_member_status = i_club_member_status, 
        fashion_news_frequency = i_fashion_news_frequency, 
        age = i_age, 
        postal_code = i_postal_code
        WHERE customer_id = i_customer_id;
        
        IF sql_error = FALSE THEN
			COMMIT;
            SELECT 'The transaction was commited';
		ELSE
			ROLLBACK;
            SELECT 'The transaction was rolled back.';
		END IF;
END // 
DELIMITER ;

# Testing update customer
CALL update_customer("00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfd123", 1, 1, "ACTIVE", "SOME", 49, "52043ee2162cf5aa7ee79974281641c6f11a68d276429a91f8ca0d4b6efa8100");
SELECT * FROM customers WHERE customer_id = "00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfd123";

# A transaction to update an transaction
DROP PROCEDURE IF EXISTS update_transaction;
DELIMITER // 
CREATE PROCEDURE update_transaction(
	IN i_t_id INT, 
	IN i_t_dat DATE,
	IN i_customer_id VARCHAR(64),
	IN i_article_id VARCHAR(10),
	IN i_price DECIMAL(19, 18),
	IN i_sales_channel_id VARCHAR(1))
BEGIN
	DECLARE sql_error INT DEFAULT FALSE; 
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET sql_error = TRUE;
    
    START TRANSACTION;
		UPDATE transactions
        SET
		t_dat = i_t_dat,
		customer_id = i_customer_id,
		article_id = i_article_id,
		price = i_price,
		sales_channel_id = i_sales_channel_id
        WHERE transaction_id = i_t_id;
        
        IF sql_error = FALSE THEN
			COMMIT;
            SELECT 'The transaction was commited';
		ELSE
			ROLLBACK;
            SELECT 'The transaction was rolled back.';
		END IF;
END // 
DELIMITER ;

# Testing update transaction
CALL update_transaction(5, CAST("2018-09-20" AS DATE),"00000dbacae5abe5e23885899a1fa44253a17956c6d1c3d25f88aa139fdfd123", "0108723457", "0.12321", "2");
SELECT * FROM transactions WHERE transaction_id =5;


