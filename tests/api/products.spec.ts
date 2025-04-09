import { expect, test } from "@playwright/test";

test.describe("Products", () => {
  test("Get list of products", async ({ request }) => {
    const res = await request.get(
      "https://api.practicesoftwaretesting.com/products"
    );

    expect(res).toBeOK(); //ensures response status code is 200-299

    const body = await res.json();
    expect(body).toHaveProperty("current_page");
    expect(typeof body.current_page).toBe("number");

    expect(body).toHaveProperty("data");
    expect(Array.isArray(body.data)).toBe(true);

    expect(body).toHaveProperty("from");
    expect(typeof body.from).toBe("number");

    expect(body).toHaveProperty("last_page");
    expect(typeof body.last_page).toBe("number");

    expect(body).toHaveProperty("per_page");
    expect(typeof body.per_page).toBe("number");

    expect(body).toHaveProperty("to");
    expect(typeof body.to).toBe("number");

    expect(body).toHaveProperty("total");
    expect(typeof body.total).toBe("number");
  });

  test("Get product by id", async ({ request }) => {
    // Ensure the productId is available

    const res = await request.get(
      "https://api.practicesoftwaretesting.com/products"
    );

    expect(res).toBeOK();
    const productsResponse = await res.json();

    const productId = productsResponse.data[0].id;
    expect(productId).toBeDefined();

    const response = await request.get(`/products/${productId}`);

    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("id");
    expect(typeof responseBody.id).toBe("string");

    expect(responseBody).toHaveProperty("name");
    expect(typeof responseBody.name).toBe("string");

    expect(responseBody).toHaveProperty("price");
    expect(typeof responseBody.price).toBe("number");

    expect(responseBody).toHaveProperty("is_rental");
    expect(typeof responseBody.is_rental).toBe("boolean");

    expect(responseBody).toHaveProperty("product_image");
    expect(typeof responseBody.product_image).toBe("object");
  });

  test("search and filter", async ({ request }) => {
    const searchByName = "pliers";
    const res = await request.get(
      "https://api.practicesoftwaretesting.com/products/search",
      {
        params: {
          q: searchByName,
        },
      }
    );

    expect(res.status()).toBe(200);
    const productsResponse = await res.json();
    expect(productsResponse).toHaveProperty("data");
    expect(Array.isArray(productsResponse.data)).toBe(true);
  });
});
