import { expect, test } from "@playwright/test";

test.describe("Authentication", () => {
  const storageStatePath = "authStorageState.json"; // File to save the storage stat
  test("Register a user", async ({ browser, request }) => {
    const resgisterResponse = await request.post(
      "https://api.practicesoftwaretesting.com/users/register",
      {
        data: {
          first_name: "John",
          last_name: "Doe",
          address: {
            street: "Street 1",
            city: "City",
            state: "State",
            country: "Country",
            postal_code: "1234AA",
          },
          phone: "0987654321",
          dob: "1970-01-01",
          password: "Testing@2025",
          email: "someone@gmail.com",
        },
      }
    );

    expect(resgisterResponse.status()).toBe(201);
    const registerResponsebody = await resgisterResponse.json();

    expect(registerResponsebody).toHaveProperty("id");
    expect(typeof registerResponsebody.id).toBe("string");

    const loginResponse = await request.post(
      "https://api.practicesoftwaretesting.com/users/login",
      {
        data: {
          email: "someone@gmail.com",
          password: "Testing@2025",
        },
      }
    );
    expect(loginResponse.status()).toBe(200);
    const loginResponseBody = await loginResponse.json();

    expect(loginResponseBody).toHaveProperty("access_token"); // Check if 'token' key exists
    expect(typeof loginResponseBody.access_token).toBe("string");

    // Save storage state into the file.
    await request.storageState({ path: "state.json" });

    // Create a new context with the saved storage state.
    const context = await browser.newContext({ storageState: "state.json" });
    console.log(await request.storageState());
  });
});
