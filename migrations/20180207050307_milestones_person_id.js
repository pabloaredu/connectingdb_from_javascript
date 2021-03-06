
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.alterTable('milestones', function(table) {
            table.integer('famous_person_id').nullable();
         })
};

exports.down = function(knex, Promise) {
    knex.schema.alterTable('milestones'), function(table) {
        table.dropColumn('famous_person_id');
};
