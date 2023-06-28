function Reynolds() {
  const Galonaje = parseFloat(document.getElementById("Galonaje").value);
  const Densidad = parseFloat(document.getElementById("Densidad").value);
  const Diametro = parseFloat(document.getElementById("Diametro1").value);
  const DiametroexternoTP = parseFloat(
    document.getElementById("DiametroexternoTP").value
  );
  const DiametroInternoPoso = parseFloat(
    document.getElementById("DiametroInternoPoso").value
  );
  const viscosidad = parseFloat(document.getElementById("viscosidad").value);
  const Longitud = parseFloat(document.getElementById("Longitud").value);
  const velocidad = Galonaje / (2.45 * (Diametro * Diametro));
  const Re = (928 * (Densidad * velocidad * Diametro)) / viscosidad;
  const FactorDeFriccion = 0.0791 / Math.pow(Re, 0.25);

  const PerdidatuberiaT =
    ((FactorDeFriccion * (velocidad * velocidad) * Densidad) /
      (92.916 * Diametro)) *
    Longitud;

  const PerdidatuberiaL =
    ((viscosidad * velocidad) / (1500 * (Diametro * Diametro))) * Longitud;

  const AnularL =
    (viscosidad * velocidad) /
    (1500 *
      (DiametroInternoPoso * DiametroInternoPoso +
        DiametroexternoTP * DiametroexternoTP -
        (DiametroInternoPoso * DiametroInternoPoso) /
          Math.log(DiametroexternoTP / DiametroInternoPoso)));

  const AnularT =
    ((FactorDeFriccion * Math.pow(velocidad, 2) * Densidad * Longitud) /
      92.916) *
    (DiametroInternoPoso - DiametroexternoTP);

  document.getElementById("resultado").innerHTML =
    "El número de Reynolds es: " + Re.toFixed(3);

  document.getElementById("resultado2").innerHTML =
    "El factor de fricción es:" + FactorDeFriccion.toFixed(3);

  if (Re > 2100) {
    document.getElementById("resultado3").innerHTML =
      "La perdida de presion con en la tuveria con es: " +
      PerdidatuberiaT.toFixed(11) +
      " PSI  (Flujo turbulento)";
    document.getElementById("resultado4").innerHTML =
      "La perdida de presion en el anular es:" +
      AnularL.toFixed(3) +
      "PSI (Flujo laminar)";
  } else {
    document.getElementById("resultado3").innerHTML =
      "la perdida de presion en la tuveria es: " +
      PerdidatuberiaL.toFixed(11) +
      "PSI (Flujo Laminar)";
    document.getElementById("resultado4").innerHTML =
      "La perdida de presion en el anular es: " +
      AnularT.toFixed(3) +
      "PSI (Flujo turbulento)";
  }
}
