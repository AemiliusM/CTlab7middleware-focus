DROP TABLE IF EXISTS jokes;

CREATE TABLE jokes (
    id SERIAL PRIMARY KEY,
    catagory VARCHAR(512) NOT NULL,
    typeOfjoke VARCHAR(512) NOT NULL,
    setup VARCHAR(512), 
    delivery VARCHAR(512),
    joke VARCHAR(512)
)

