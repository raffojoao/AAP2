$(document).ready(function () {
  $(".imagem").hide();
  $("#jogo").hide();
  $("#jogarNovamente").hide();

  var nomeMarvel = "";
  var nomeDC = "";
  var vencedor = "";
  var vez = 1;
  var pontosMarvel = 0;
  var pontosDC = 0;

  $(".casa").on("click", clicar);

  $("#btnIniciarJogo").click(inserirDados);

  $("#jogarNovamente").click(function () {
    $(".casa").on("click", clicar);
    $("body").css("background-image", "");
    vencedor = "";
    vez = 1;
    $(".jogadorAtual").text(`Vez de ${nomeMarvel}`);
    for (var i = 1; i <= 9; i++) {
      $(`#imagem${i}`).attr("src", "");
    }
    $("#jogarNovamente").hide();
    $("#formulario").show();
  });

  function inserirDados() {
    nomeMarvel = $("#jogadorMarvel").val();
    nomeDC = $("#jogadorDC").val();

    if (nomeMarvel === "" || nomeDC === "") {
      alert("INSIRA OS NOMES");
    } else {
      iniciarJogo();
    }
  }

  function iniciarJogo() {
    $("#formulario").hide();
    $("#jogarNovamente").hide();
    $(".imagem").hide();
    $("#jogo").show();
    $(".jogadorAtual").text(`Vez de ${nomeMarvel}`);
  }

  function clicar() {
    var child = $(this).children("img")[0];
    var img = $(`#${$(child).attr("id")}`);
    if (img.attr("src") == "") {
      var fig = `assets/images/${vez.toString()}.png`;
      img.attr("src", fig);
      vez = vez == 1 ? 2 : 1;
      $(".jogadorAtual").text(`Vez de ${vez == 1 ? nomeMarvel : nomeDC}`);
      img.show();
      verificarFimDeJogo();
    }
  }

  function casasIguais(a, b, c) {
    var figA = $(`#imagem${a}`).attr("src");
    var figB = $(`#imagem${b}`).attr("src");
    var figC = $(`#imagem${c}`).attr("src");
    if (figA == figB && figB == figC && figA != "") {
      if (figA === "assets/images/1.png") {
        alert("Marvel é melhor que DC");
        vencedor = "marvel";
        pontosMarvel++;
        $(".pontosMarvel").text(pontosMarvel);
      } else {
        alert("DC é melhor que Marvel");
        vencedor = "dc";
        pontosDC++;
        $(".pontosDC").text(pontosDC);
      }
      $("#jogo").hide();
      $("body").css("background-image", `url(assets/images/${vencedor}.png)`);
      $("#jogarNovamente").show();
      return true;
    } else {
      return false;
    }
  }

  function verificarFimDeJogo() {
    if (
      casasIguais(1, 2, 3) ||
      casasIguais(4, 5, 6) ||
      casasIguais(7, 8, 9) ||
      casasIguais(1, 4, 7) ||
      casasIguais(2, 5, 8) ||
      casasIguais(3, 6, 9) ||
      casasIguais(1, 5, 9) ||
      casasIguais(3, 5, 7)
    ) {
      $(".casa").off("click");
    }
  }
});
