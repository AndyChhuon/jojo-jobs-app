/* eslint-disable no-use-before-define */

import React from "react";
import AppApiTest from "./AppApiTest";

test("Api Get Testing", async () => {
  const data = await AppApiTest.getPostings();

  expect(data).not.toBeNull();
});
