/*
  This JavaScript file contains code generated with assistance from ChatGPT,
  an AI language model developed by OpenAI.

  ChatGPT was used for advice on certain functionalities and structures in
  this project.

  For more information, visit: https://openai.com/chatgpt
*/

import { userStrings } from "./../lang/en/en.js";

class APIs {
  constructor() {
    this.url = "https://potipress.com/lab5/api";
    this.userStrings = userStrings;
    this.init();
  }

  init() {
    document
      .getElementById("input-form")
      .addEventListener("submit", (event) => this.sendQuery(event));
    document
      .getElementById("store-btn")
      .addEventListener("click", (event) => this.storeData(event));
  }

  async sendQuery(event) {
    event.preventDefault();

    const query = document.getElementById("query").value;

    try {
      const response = await fetch(this.url + encodeURIComponent(query), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (query.startsWith("SELECT")) {
        const resultContainer = document.getElementById("result-container");
        resultContainer.innerHTML = `
          <table>
            <tr>
              <th>${this.userStrings.tableHeaders.patientID}</th>
              <th>${this.userStrings.tableHeaders.name}</th>
              <th>${this.userStrings.tableHeaders.dateOfBirth}</th>
            </tr>
            ${result.results
              .map(
                (row) => `
              <tr>
                  <td>${row.patientID}</td>
                  <td>${row.name}</td>
                  <td>${formatDate(row.dateOfBirth)}</td>
              </tr>
            `
              )
              .join("")}
          </table>
        `;
        console.log("Server response:", result);
      } else if (query.startsWith("INSERT")) {
        console.log("Server response:", result);
      }
    } catch (error) {
      if (error) {
        console.error("Error: ", error);
      }
    }
  }

  async storeData(event) {
    event.preventDefault();

    try {
      const response = await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ params: this.userStrings.samplePatients }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Server response:", result);
    } catch (error) {
      if (error) {
        console.error("Error: ", error);
      }
    }
  }
}

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};

new APIs();
