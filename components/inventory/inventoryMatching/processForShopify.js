const processForShopify = (array) => {
  return array.map(
    ({
      scannedQuantity,
      ISBN,
      SKU,
      Author,
      Title,
      Dimensions,
      Format,
      Pages,
      Plot,
      PurchasePrice,
      Tags,
    }) => {
      const cleanedTags = Tags?.replace(/[\|\/]/g, ",").trim();

      return {
        Title: Title || "",
        Author: Author || "",
        "Variant Inventory Qty": scannedQuantity || "",
        "Variant Inventory Policy": "Deny",
        "Body (HTML)": `${Plot || ""} \n Dimensions:${
          Dimensions || ""
        }  \n Author: ${Author || ""} \n ISBN: ${ISBN || ""} \n Format: ${
          Format || ""
        } \n Pages ${Pages || ""}`,
        Vendor: "bookhero.ae",
        Published: "TRUE",
        "Variant Barcode": ISBN || "",
        "Variant Sku": SKU || "",
        "Varient Inventory Tracker": "Shopify",
        "Variant Fullfilment Service": "Manual",
        Format: Format || "",
        Pages: parseInt(Pages) || "",
        Tags: cleanedTags || "",
        "Variant Price": parseInt(PurchasePrice) || "",
        "Variant Requires": "TRUE",
        "Image Src": "",
        "Image Pos": 1,
        "Image Alt Text": `Links to ${Title || ""} by ${Author || ""}`,
        "SEO Title": `${Title || ""} | ${Author || ""}`,
        "SEO Description": "",
        Status: "Active",
        "Standard Product Type": "Media > Books > Print Books",
        "Custom Product Type": "Reading Books",
        Dimensions: Dimensions || "",
      };
    }
  );
};

export default processForShopify;
