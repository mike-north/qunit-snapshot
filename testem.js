module.exports = {
  launchers: {
    Node: {
      cwd: process.env.EMBER_CLI_TEST_OUTPUT,
      command: `qunit "commonjs/test/**/*-test.js"`,
      protocol: 'tap'
    }
  },

  framework: 'qunit',
  test_page: 'index.html?hidepassed',
  reporter: 'xunit',
  report_file: 'coverage/coverage.xml',
  xunit_exclude_stack: true, // we *probably* want this on to keep the xunit file clean
  xunit_intermediate_output: true,
  browser_args: {
    Chrome: ['--headless', '--disable-gpu', '--remote-debugging-port=9222']
  },

  disable_watching: true,
  launch_in_dev: ['Node', 'Chrome'],
  launch_in_ci: ['Node', 'Chrome']
};
