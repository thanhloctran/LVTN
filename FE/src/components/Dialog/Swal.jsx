import Swal from 'sweetalert2'

export const swalEmptyError=()=>{
    return(
        Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: "You don't have any item in Cart! Go shopping",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Start Shoping!'
      })
    )
}
export const swalPayPal=(type, title, text, button)=>{
  return(
    Swal.fire({
    type: type,
    title: title,
    text: text,
    showCancelButton: button,
    cancelButtonColor: '#d33',
  })
)
}

export const swalMessage=(type, mesage, text)=> {
  return(
    Swal.fire({
      type: type,
      title: mesage,
      text: text,
      timer: 1500,
      showConfirmButton: false
  })
  )
  
}
export const swalError=(text)=> {
  return(
    Swal.fire({
      type:'error',
      icon: 'error',
      title: 'Oops...',
      text: text,
      footer: '<span>Check it Again?<span>'
    })
  )
  
}

export const swalCleartCart=()=>{
  return(
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Clear!',
    }).then((result) => {
      
      if (result.value) {
       // this.props.dispatch(clearCartAction());
        Swal.fire({
          type: 'success',
          title: 'Deleted!',
          text:  'Your cart has been deleted.',
          showConfirmButton: false,
          timer: 800,
        })
      }
      else{
        //this.props.dispatch(showCartDlg(true));
      }
    })
  )
}