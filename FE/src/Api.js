import axios from 'axios';

// Methods of this class are used to simulate calls to server.

class Api {
  sampleProducts=[];

//API GET PRODUCT ACTION
getListProductAction = () => {
      axios({
        url: `https://localhost:44302/api/QuanLySanPham/LayDanhSachSanPhamClient`,
        method: 'GET'
      }).then((result) => {
        this.sampleProducts = result.data;
      }).catch(error => {
        console.log(error.data);
  
      })
    
  }
  getItemUsingID(id) {
   this.getListProductAction();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let res = this.sampleProducts.filter(x => x.maSP === id);     
        resolve(res.length === 0 ? null : res[0]);
      }, 500);
    });
  }

  _sortData(data, sortval) {
    if (!sortval) return data;
    
    let items = JSON.parse(JSON.stringify(data));
    if(items!== null){
      if (sortval === "lh") {
        items.sort((a, b) =>
          a.donGia > b.donGia ? 1 : b.donGia > a.donGia ? -1 : 0
        );
      } else if (sortval === "hl") {
        items.sort((a, b) =>
          a.donGia < b.donGia ? 1 : b.donGia < a.donGia ? -1 : 0
        );
      }
    }
    else{
      console.log("error");
      
    }
    return items;
  }

  searchItems({
    category= "popular",
    term="",
    sortValue ="lh",
    itemsPerPage=15,
    // popular,
    usePriceFilter= false,
    minPrice=0,
    maxPrice=10000,
    page=1
  }) {
    
    return new Promise((resolve, reject) => {
      minPrice = parseInt(minPrice, 0);
      maxPrice = parseInt(maxPrice, 0);

      setTimeout(() => {
        let data = this.sampleProducts.filter(item => {
          if (
            usePriceFilter &&
            (item.donGia < minPrice || item.donGia > maxPrice)
          ) {
            return false;
          }

          if (category === "popular") {
            return item.spMoi;
          }
          if (category === "Discount") {
            return item.giamGia;
          }
          if (category === "Bestseller") {
            return item.soLanMua;
          }
          if (category === "HighRate") {
            return item.luotBC;
          }


          if (category !== "All categories" && category !== item.maLoaiSP)
            return false;

          if (term && !item.tenSP.toLowerCase().includes(term.toLowerCase()))
            return false;

          return true;
        });

        let totalLength = data.length;

        // Sort data if needed
        data = this._sortData(data, sortValue);

        // Get data from the requested page.
        page = parseInt(page, 0);
        data = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

        resolve({ data, totalLength });
      }, 500);
    });
  }
}

export default new Api();
