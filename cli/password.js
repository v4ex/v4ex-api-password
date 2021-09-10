/* Copyright (c) V4EX Inc. SPDX-License-Identifier: GPL-3.0-or-later */

// Purpose: Provide CLI command password to control Password in database.


/**
 * @param {*} Password (optional)
 * @param {*} mongoose (optional)
 * @param {*} modelName (optional)
 * @param {*} env (optional)
 */
 module.exports = ({ Password, mongoose, modelName, env }) => {
  Password = Password || require('../models/password')({ mongoose, modelName, env }).Password

  const { program } = require('commander')

  const done = () => {
    Password.base.connection.close()
  }

  program.command('password')
         .description('control Password model in database')
         .option('--drop', 'Drop Password model collection in database')
         .action((options) => {
           if (options.drop) {
             Password.collection.drop(done)
           }
         })

}
