const pay = () => {
  Payjp.setPublicKey(process.env.PAYJP_PUBLIC_KEY);
  const form = document.getElementById("charge-form");
  form.addEventListener("submit",(e) => {
  e.preventDefault();
  
  const formResult =  document.getElementById("charge-form");
  const formData = new FormData(formResult);

  const card = {
    number: formData.get("order[number]"),
    cvc: formData.get("order[cvc]"),
    exp_month: formData.get("order[exp_month]"),
    exp_year: `20${formData.get("order[exp_year]")}`,
  };
  Payjp.createToken(card,(status,respose)=>{
    // 第1引数にはクレジットカード情報が入る、第2引数にはアロー関数を用いてレスポンスを受け取ったあとの処理を記述
    if (status == 200){
      const token = respose.id;
      // console.log(token)
      const renderDom = document.getElementById("charge-form");
      const tokenObj = `<input value=${token} name='token' type="hidden" >`;
      renderDom.insertAdjacentHTML("beforeend",tokenObj);
      // debugger;
    }

      document.getElementById("order_number").removeAttribute("name");
      document.getElementById("order_cvc").removeAttribute("name");
      document.getElementById("order_exp_month").removeAttribute("name");
      document.getElementById("order_exp_year").removeAttribute("name");
  
      document.getElementById("charge-form").submit();
    });
});
};

window.addEventListener("load",pay);