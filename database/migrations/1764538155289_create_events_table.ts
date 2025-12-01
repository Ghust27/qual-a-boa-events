import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('organizer_id').unsigned().references('users.id').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('description').nullable()
      table.string('location').notNullable()
      table.dateTime('event_date').notNullable()
      table.integer('max_capacity').notNullable() 
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
