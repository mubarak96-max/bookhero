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
      Subject,
      Genre
    }) => {
      const cleanedGenres = Genre?.replace(/[\|\/]/g, ",").trim();
      const cleanedTags = Tags?.replace(/[\|\/]/g, ",").trim();
      const cleanedSubjects = Subject?.replace(/[\|\/]/g, ",").trim();

      const allTags = [cleanedTags, cleanedGenres, cleanedSubjects]
        .filter(Boolean) // filter out any falsy values like undefined or empty strings
        .join(", ");

      return {
        Title: Title || "",
        Author: Author || "",
        Tags: allTags || "",
        "Variant Inventory Qty": scannedQuantity || "",
        "Variant Inventory Policy": "Deny",
        "Body (HTML)": `${Plot || ""} \n Dimensions:${
          Dimensions || ""
        }  \n Author: ${Author || ""} \n ISBN: ${ISBN || ""} \n Format: ${
          Format || ""
        } \n Pages ${Pages || ""}`,
        Vendor: "bookhero.ae",
        Published: "TRUE",
        "Variant Barcode": `'${String(ISBN)}` || "",
        "Variant Sku": SKU || "",
        "Variant Inventory Tracker": "shopify",
        "Variant Fullfilment Service": "Manual",
        Format: Format || "",
        Pages: parseInt(Pages) || "",
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
        "Google Shopping / Google Product Category": "Books"
        // "Google Shopping / AdWords Grouping": "",
        // "Google Shopping / AdWords Labels": ""
      };
    }
  );
};

export default processForShopify;
