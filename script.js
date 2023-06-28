function Reynolds() {
  const Galonaje = parseFloat(document.getElementById("Galonaje").value);
  const Densidad = parseFloat(document.getElementById("Densidad").value);
  const Diametro = parseFloat(document.getElementById("Diametro1").value);
  const Diametro2 = parseFloat(document.getElementById("Diametro2").value);
  const viscosidad = parseFloat(document.getElementById("viscosidad").value);
  const Longitud = parseFloat(document.getElementById("NDP").value) * 30;
  const Longitud2 = parseFloat(document.getElementById("NDC").value) * 30;
  const Cd = parseFloat(document.getElementById("Cd").value);
  const Areaboquilla = parseFloat(
    document.getElementById("AreaBoquillas").value
  );
  const De = Areaboquilla / 32;

  const DiametroexternoTP = parseFloat(
    document.getElementById("DiametroexternoTP").value
  );

  const DiametroExternoDC = parseFloat(document.getElementById("DEDC").value);

  const DiametroInternoPoso = parseFloat(
    document.getElementById("DiametroInternoPoso").value
  );

  const D22 = Math.pow(DiametroInternoPoso, 2);
  const D11 = Math.pow(DiametroexternoTP, 2);
  const DEC = Math.pow(DiametroExternoDC, 2);

  /* Calculos de numero de Reynolds y Factor de friccion*/

  const velocidad = Galonaje / (2.45 * Math.pow(Diametro, 2));
  const velocidadEnmin1 = velocidad * 60;
  const velocidad2 = Galonaje / (2.45 * Math.pow(D22 - D11, 2));
  const velocidad3 = Galonaje / (2.45 * Math.pow(Diametro2, 2));
  const velocidadEnmin2 = velocidad3 * 60;
  const velocidad4 = Galonaje / (2.45 * Math.pow(D22 - DEC, 2));

  const Re = (928 * (Densidad * velocidad * Diametro)) / viscosidad;
  const Re2 = (928 * (Densidad * velocidad2 * (D22 - D11))) / viscosidad;
  const Re3 = (928 * (Densidad * velocidad3 * Diametro2)) / viscosidad;
  const Re4 = (928 * (Densidad * velocidad4 * (D22 - DEC))) / viscosidad;

  const FactorDeFriccion = 0.0791 / Math.pow(Re, 0.25);
  const FactorDeFriccion2 = 0.0791 / Math.pow(Re2, 0.25);
  const FactorDeFriccion3 = 0.0791 / Math.pow(Re3, 0.25);
  const FactorDeFriccion4 = 0.0791 / Math.pow(Re4, 0.25);

  /* perdida de presion en la broca */

  const perdidaBroca =
    (0.000135 * Densidad * (Galonaje * Galonaje)) / (Cd * Cd * (De * De));

  /* Calculos perdidas de presion en Drill pipes */

  const PerdidatuberiaT =
    ((FactorDeFriccion * (velocidad * velocidad) * Densidad) /
      (25.8 * Diametro)) *
    Longitud;

  const PerdidatuberiaL =
    ((viscosidad * velocidad) / (1500 * (Diametro * Diametro))) * Longitud;

  /* Calculos perdidas de presion en Anular Hueco - Drill pipes */

  const AnularL =
    (viscosidad * velocidad2) /
    (1500 *
      (DiametroInternoPoso * DiametroInternoPoso +
        DiametroexternoTP * DiametroexternoTP -
        (DiametroInternoPoso * DiametroInternoPoso) /
          Math.log(DiametroexternoTP / DiametroInternoPoso)));

  const AnularT =
    ((FactorDeFriccion2 * Math.pow(velocidad2, 2) * Densidad) /
      (25.8 * (DiametroInternoPoso - DiametroexternoTP))) *
    Longitud;

  /* Calculos perdidas de presion en Drill Collars */
  const PerdidatuberiaDCL =
    ((FactorDeFriccion3 * (velocidad2 * velocidad2) * Densidad) /
      (25.8 * Diametro2)) *
    Longitud;

  const PerdidatuberiaDCT =
    ((viscosidad * velocidad3) / (1500 * (Diametro2 * Diametro2))) * Longitud2;

  console.log(Longitud, Longitud2);

  /* Calculos perdidas de presion en Anular Hueco - Drill collar */
  const AnularDCL =
    (viscosidad * velocidad4) /
    (1500 *
      (DiametroInternoPoso * DiametroInternoPoso +
        DiametroExternoDC * DiametroExternoDC -
        (DiametroInternoPoso * DiametroInternoPoso) /
          Math.log(DiametroExternoDC / DiametroInternoPoso)));

  const AnularDCT =
    ((FactorDeFriccion4 * (velocidad4 * velocidad4) * Densidad) /
      (25.8 * (DiametroInternoPoso - DiametroExternoDC))) *
    Longitud;
  /* Condicionales , si es laminar o turbulento */

  /* condicionales Drill pipes */

  if (Re > 2100) {
    document.getElementById("resultado3").innerHTML =
      "La perdida de presión con en los Drill pipes es: " +
      PerdidatuberiaT.toFixed(3) +
      " LPC  (Flujo turbulento)";
  } else {
    document.getElementById("resultado3").innerHTML =
      "La perdida de presión con en los Drill pipes es: " +
      PerdidatuberiaL.toFixed(5) +
      " LPC (Flujo Laminar)";
  }

  /* Condicionales Anulares  Hueco- Drill pipes*/

  if (Re2 > 2100) {
    document.getElementById("resultado4").innerHTML =
      "La perdida de presión en el anular Hueco-Drill pipe es: " +
      AnularT.toFixed(8) +
      " LPC (Flujo turbulento)";
  } else {
    document.getElementById("resultado4").innerHTML =
      "La perdida de presión en el anular Hueco-Drill pipe es:" +
      AnularL.toFixed(10) +
      " LPC (Flujo laminar)";
  }

  /* Condicionales collares */
  if (Re3 > 2100) {
    document.getElementById("resultado5").innerHTML =
      "La perdida de presión en los Drill collars es: " +
      PerdidatuberiaDCT.toFixed(3) +
      " LPC  (Flujo turbulento)";
  } else {
    document.getElementById("resultado5").innerHTML =
      "La perdida de presión en los Drill collars es: " +
      PerdidatuberiaDCL.toFixed(5) +
      " LPC (Flujo Laminar)";
  }

  /* Condicionales anular hueco-collares */

  if (Re4 > 2100) {
    document.getElementById("resultado6").innerHTML =
      "La perdida de presión en el anular Hueco - Drill Collar es: " +
      AnularDCT.toFixed(3) +
      " LPC  (Flujo turbulento)";
  } else {
    document.getElementById("resultado6").innerHTML =
      "La perdida de presión en el anular Hueco-Drill Collar es: " +
      AnularDCL.toFixed(5) +
      " LPC (Flujo Laminar)";
  }

  document.getElementById("resultado7").innerHTML =
    "la perdida de presión en la broca es: " + perdidaBroca.toFixed(3) + " LPC";
}
