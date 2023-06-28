function Reynolds() {
  const Galonaje = parseFloat(document.getElementById("Galonaje").value);
  const Densidad = parseFloat(document.getElementById("Densidad").value);
  const Diametro = parseFloat(document.getElementById("Diametro1").value);
  const viscosidad = parseFloat(document.getElementById("viscosidad").value);
  const Longitud = parseFloat(document.getElementById("Longitud").value);
  const Cd = parseFloat(document.getElementById("Cd").value);
  const Areaboquilla = parseFloat(
    document.getElementById("AreaBoquillas").value
  );
  const NumeroBoquillas = parseFloat(
    document.getElementById("Nboquillas").value
  );

  const De = Areaboquilla / 32;
  const DiametroexternoTP = parseFloat(
    document.getElementById("DiametroexternoTP").value
  );
  const DiametroInternoPoso = parseFloat(
    document.getElementById("DiametroInternoPoso").value
  );

  const D22 = Math.pow(DiametroInternoPoso, 2);
  const D11 = Math.pow(DiametroexternoTP, 2);

  const velocidad = Galonaje / (2.45 * (Diametro * Diametro));
  const velocidad2 = Galonaje / (2.45 * (Math.pow(D22, 2) - Math.pow(D11, 2)));
  const Re = (928 * (Densidad * velocidad * Diametro)) / viscosidad;
  const FactorDeFriccion = 0.0791 / Math.pow(Re, 0.25);

  const perdidaBroca =
    ((0.000135 * Densidad * (Galonaje * Galonaje)) / (Cd * Cd)) * (De * De);

  const PerdidatuberiaT =
    ((FactorDeFriccion * (velocidad * velocidad) * Densidad) /
      (92.916 * Diametro)) *
    Longitud;

  const PerdidatuberiaL =
    ((viscosidad * velocidad) / (1500 * (Diametro * Diametro))) * Longitud;

  const AnularL =
    (viscosidad * velocidad2) /
    (1500 *
      (DiametroInternoPoso * DiametroInternoPoso +
        DiametroexternoTP * DiametroexternoTP -
        (DiametroInternoPoso * DiametroInternoPoso) /
          Math.log(DiametroexternoTP / DiametroInternoPoso)));

  const AnularT =
    ((FactorDeFriccion * Math.pow(velocidad2, 2) * Densidad * Longitud) /
      92.916) *
    (DiametroInternoPoso - DiametroexternoTP);

  document.getElementById("resultado").innerHTML =
    "El número de Reynolds es: " + Re.toFixed(3);

  document.getElementById("resultado2").innerHTML =
    "El factor de fricción es:" + FactorDeFriccion.toFixed(3);

  if (Re > 2100) {
    document.getElementById("resultado3").innerHTML =
      "La perdida de presión con en la tubería es: " +
      PerdidatuberiaT.toFixed(3) +
      " LPC  (Flujo turbulento)";
    document.getElementById("resultado4").innerHTML =
      "La perdida de presión en el anular es:" +
      AnularL.toFixed(8) +
      " LPC (Flujo laminar)";
  } else {
    document.getElementById("resultado3").innerHTML =
      "la perdida de presión en la tubería es: " +
      PerdidatuberiaL.toFixed(5) +
      " LPC (Flujo Laminar)";
    document.getElementById("resultado4").innerHTML =
      "La perdida de presión en el anular es: " +
      AnularT.toFixed(8) +
      " LPC (Flujo turbulento)";
  }

  document.getElementById("resultado5").innerHTML =
    "la perdida de presión en la broca es: " + perdidaBroca.toFixed(3) + " LPC";
}
