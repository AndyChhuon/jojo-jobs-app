/* eslint-disable no-use-before-define */

import React from "react";
import AppApiTest from "./AppApiTest";
import JobPost from "./Components/JobPost/JobPost";
import { render, screen } from "@testing-library/react";
import Login from "./pages/Login/Login";

describe("Job Postings API", () => {
  let data;

  describe("Get Job Postings (JobPost Component)", () => {
    test("Data is received from API and properly defined", async () => {
      data = await AppApiTest.getPostings();
      expect(data).toBeDefined();
    });
    test("Data.jobTitle is defined", () => {
      expect(data[0].jobTitle).toBeDefined();
    });
    test("Data.jobDescription is defined", () => {
      expect(data[0].jobDescription).toBeDefined();
    });
    test("Data.jobCategory is defined", () => {
      expect(data[0].jobCategory).toBeDefined();
    });
    test("Data.jobLocation is defined", () => {
      expect(data[0].jobLocation).toBeDefined();
    });
    test("Data.jobCompany is defined", () => {
      expect(data[0].jobCompany).toBeDefined();
    });
    test("Data.jobDate is defined", () => {
      expect(data[0].jobDate).toBeDefined();
    });
  });
});

describe("End to end tests", () => {
  describe("Login", () => {
    test("Login page renders", () => {
      render(<Login />);
      expect(screen.getByText("Login")).toBeInTheDocument();
    });
  });
});
