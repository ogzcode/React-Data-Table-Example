import { createServer, Model } from "miragejs"
import data from "./assets/data.json"

export function makeServer({ environment = "test" } = {}) {
  let server = createServer({
    environment,

    models: {
      country: Model,
    },

    seeds(server) {
      data.data.forEach((item) => {
        server.create("country", item)
      })
    },

    routes() {
      this.namespace = "api"

      this.get("/getAllCountry", (schema, request) => {
        let sorting = JSON.parse(request.queryParams.sorting || "[]")
        let columnFilters = JSON.parse(request.queryParams.columnFilters || "[]")
        let pagination = JSON.parse(request.queryParams.pagination || "{}")


        let countries = schema.countries.all().models

        columnFilters.forEach(filter => {
          countries = countries.filter(country => {
            return country[filter.id].toString().toLowerCase().includes(filter.value.toLowerCase())
          })
        })

        if (sorting.length > 0) {
          let [sort] = sorting
          countries = countries.sort((a, b) => {
            if (a[sort.id] < b[sort.id]) return sort.desc ? 1 : -1
            if (a[sort.id] > b[sort.id]) return sort.desc ? -1 : 1
            return 0
          })
        }


        let { pageSize, pageIndex } = pagination
        pageIndex++
        let total = countries.length
        let paginatedCountries = countries.slice((pageIndex - 1) * pageSize, pageIndex * pageSize)

        return { countries: paginatedCountries, total }
      })
    },
  })

  console.log("🚀 Mock Server is running")

  return server
}