class APIFuntionality{
  constructor(query, queryStr){
    this.query = query,
    this.queryStr = queryStr
  }

 search() {
  const keyword = this.queryStr.keyword
    ? {
        name: {
          $regex: this.queryStr.keyword,
          $options: "i"
        },
      }
    : {};
   console.log(keyword);
  this.query = this.query.find({ ...keyword });
  return this;
};

filter() {
  const queryCopy = { ...this.queryStr };
  const removeFields = ["keyword", "page", "limit", "sort"];
  removeFields.forEach((el) => delete queryCopy[el]);

  let queryStr = JSON.stringify(queryCopy);
  queryStr = queryStr.replace(
    /\b(gte|gt|lte|lt)\b/g,
    (match) => `$${match}`
  );

  this.query = this.query.find(JSON.parse(queryStr));

  return this;
};

sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }


}

export default APIFuntionality;