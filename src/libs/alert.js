import Swal from "sweetalert2";

const options = {
  title: "",
  text: "",
  icon: "",
  confirmButtonText: "Ok",
  showConfirmButton: true,
  showDenyButton: false,
};

// mostrar alertas
export function alertService() {
  const ShowAlert = async (title, text, icon) => {
    options.title = title;
    options.text = text;
    options.icon = icon;
    options.showDenyButton = false;
    Swal.fire(options);
  };
  const ShowAlertConfirm = async (title, text, icon) => {
    options.title = title;
    options.text = text;
    options.icon = icon;
    options.showDenyButton = true;
    let rest = false;
    await Swal.fire(options).then((result) => {
      if (result.isConfirmed) rest = true;
      else if (result.isDenied) rest = false;
      else rest = false;
    });
    return rest;
  };
  return { ShowAlert, ShowAlertConfirm };
}
