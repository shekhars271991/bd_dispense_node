const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    user: 'root',
    password: 'admin',
    host: 'localhost',
    database: 'bd_db',
    port: '3306'

});

const getActiveOrdersforUserQuery = "SELECT  \
ao.order_id orderId, \
ap.partner_name partnerName, \
ap.partner_id partnerId, \
os.order_status orderStatus, \
ao.order_start_time orderStartTime, \
ao.order_end_time orderEndTime, \
ao.order_expiration_time orderExpirationTime \
FROM \
bd_db.all_orders ao \
    INNER JOIN \
all_partners ap ON ao.partner_id = ap.partner_id \
    INNER JOIN \
order_statuses os ON ao.order_status = os.order_status_id \
WHERE \
ao.user_id = ? \
    AND os.order_status = 'active'";

const getOrderBeveragesQuery = "SELECT \
ob.order_beverages_id orderBevId, \
ab.beverage_id bevId, \
ab.beverage_name bevName, \
ab.display_pic_url bevImageUrl, \
obs.order_beverage_status orderBevStatus, \
pi.partner_id partnerId, \
abt.bd_tap_id bdTapId, \
abd.bd_dispenser_id bdDispenserId \
FROM \
order_beverages ob \
    INNER JOIN \
order_beverage_statuses obs ON ob.order_beverage_status = obs.order_beverage_status_id \
    INNER JOIN \
all_beverages ab ON ob.beverage_id = ab.beverage_id \
    INNER JOIN \
partner_inventory pi ON ob.beverage_id = pi.beverage_id \
    INNER JOIN \
all_bd_taps abt ON pi.mapped_to_bd_tap = abt.bd_tap_id \
    INNER JOIN \
all_bd_dispensers abd ON abd.bd_dispenser_id = abt.mapped_to_dispenser \
WHERE \
ob.order_id = ? AND pi.partner_id = ?";

let bd_db = {};

bd_db.getActiveOrdersForUser = (userId) => {
    return new Promise((resolve, reject) => {

        pool.query(getActiveOrdersforUserQuery, [userId], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
    });
};


bd_db.getBevDetails = (orderId, partnerId) => {
    return new Promise((resolve, reject) => {

        pool.query(getOrderBeveragesQuery, [orderId, partnerId], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
    });
};

bd_db.updateOrderBeveragesRecord = (orderBeverageId) => {
    return new Promise((resolve, reject) => {

        pool.query("", [orderBeverageId], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
    });
};

bd_db.updateAllOrdersRecord = (orderId) => {
    return new Promise((resolve, reject) => {

        pool.query("", [orderBeverageId], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
    });
};

bd_db.getOrderDispenses = (userId) => {
    return new Promise((resolve, reject) => {

        pool.query("", [userId], (err, results) => {
            if (err) {
                return reject(err);
            } else {
                return resolve(results);
            }
        });
    });
};
module.exports = bd_db;