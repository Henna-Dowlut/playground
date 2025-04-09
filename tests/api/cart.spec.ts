import test, { expect } from "@playwright/test";

test.describe("Cart operations", () => {
  let productId;
  test.beforeAll("Get products", async ({ request }) => {
    const res = await request.get(
      "https://api.practicesoftwaretesting.com/products"
    );

    expect(res).toBeOK(); //ensures response status code is 200-299

    const body = await res.json();
    expect(body.data[0].id).toBeDefined();
    productId = body.data[0].id;
  });
  test("Add item to cart POST, Get cart and remove item from cart", async ({
    request,
  }) => {
    const cartResponse = await request.post(
      "https://api.practicesoftwaretesting.com/carts"
    );

    expect(cartResponse).toBeOK();

    const cartResponseBody = await cartResponse.json();

    expect(cartResponseBody.id).toBeDefined();
    expect(typeof cartResponseBody.id).toBe("string");
    expect(productId).toBeDefined();

    const addItemToCartResponse = await request.post(
      `https://api.practicesoftwaretesting.com/carts/${cartResponseBody.id}`,
      {
        data: {
          product_id: productId,
          quantity: 1,
        },
      }
    );
    const addItemResponseBody = await addItemToCartResponse.json();
    expect(addItemToCartResponse.status()).toBe(200);

    expect(addItemResponseBody.result).toBe("item added or updated");

    // Get Cart
    const getCartResponse = await request.get(
      `https://api.practicesoftwaretesting.com/carts/${cartResponseBody.id}`
    );
    expect(getCartResponse).toBeOK();
    const getCartResponseBody = await getCartResponse.json();

    expect(getCartResponseBody.id).toBeDefined();
    expect(typeof getCartResponseBody.id).toBe("string");

    //Delete item from cart

    const deleteItemFromCartResponse = await request.delete(
      `https://api.practicesoftwaretesting.com/carts/${cartResponseBody.id}/product/${productId}`
    );
    expect(deleteItemFromCartResponse).toBeOK();
  });
});
