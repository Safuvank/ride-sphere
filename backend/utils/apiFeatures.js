class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  // Search
  search() {
    if (this.queryString.search) {
      this.query = this.query.find({
        $or: [
          { name: { $regex: this.queryString.search, $options: "i" } },
          { description: { $regex: this.queryString.search, $options: "i" } },
        ],
      });
    }
    return this;
  }

  // Category filter
  filter() {
    if (
      this.queryString.category &&
      this.queryString.category !== "All"
    ) {
      this.query = this.query.find({
        category: this.queryString.category,
      });
    }
    return this;
  }

  // Sorting
  sort() {
    let sortOption = {};

    if (this.queryString.sort === "price-low-high")
      sortOption = { price: 1 };

    if (this.queryString.sort === "price-high-low")
      sortOption = { price: -1 };

    if (this.queryString.sort === "name-az")
      sortOption = { name: 1 };

    if (this.queryString.sort === "name-za")
      sortOption = { name: -1 };

    this.query = this.query.sort(sortOption);
    return this;
  }

  // Pagination
  paginate(resultPerPage) {
    const currentPage = Number(this.queryString.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

module.exports = APIFeatures;
