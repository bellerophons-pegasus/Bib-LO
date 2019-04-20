var configuration = {
  searchableFields: ['workLabel', 'topics', 'date', 'places', 'authors', 'editors', 'authorstrings'],
  sortings: {
    name_asc: {
      field: 'workLabel',
      order: 'asc'
    }
  },
  aggregations: {
    topics: {
      title: 'Topics',
      size: 10
    }, //, for more just add them via their attribute name
    objects: {
      title: 'Individual seals',
      size: 10
    },
    places: {
      title: 'Places',
      size: 10
    }
  }
}

// the rows comes from external resources
// https://github.com/itemsapi/itemsapi-example-data/blob/master/jsfiddle/imdb.js

//with json: var as = JSON.parse(jstring);
itemsjs = itemsjs(literature, configuration);
Vue.component('paginate', VuejsPaginate)

var vm = new Vue({
  el: '#el',
  data: function () {

    // making it more generic
    var filters = {};
    Object.keys(configuration.aggregations).map(function(v) {
      filters[v] = [];
    })

    // adding pagination variables
    var page = this.page || 1;
    var per_page = this.per_page || 12;

    return {
      query: '',
      // initializing filters with empty arrays
      filters: filters,
      // setting pagination variables
      page: page,
      per_page: per_page,
    }
  },
  methods: {
    reset: function () {
      var filters = {};
      Object.keys(configuration.aggregations).map(function(v) {
        filters[v] = [];
      })

      this.filters = filters;
      this.page = 1;
      this.query = '';
    },
    goToPage: function (page) {
      this.page = page;
      return page;
    },
  },
  watch: {
     query: function () {
       this.page = 1;
     }
  },
  computed: {
    searchResult: function () {

      var result = itemsjs.search({
        query: this.query,
        page: this.page,
        per_page: 10,
        filters: this.filters
      })
      return result
    }
  }
});
