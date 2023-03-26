class AppApitTest {
  static getPostings() {
    return fetch("https://jobapplicationsapi.azurewebsites.net/api/JobPostsAPI")
      .then((response) => response.json())
      .then((data) => data);
  }
}

export default AppApitTest;
