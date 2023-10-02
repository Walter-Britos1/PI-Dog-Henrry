// Función para analizar la cadena de peso y obtener un valor numérico
const parseWeight = (weightString) => {
  // Divide la cadena de peso en dos números separados por un guión
  const weights = weightString.split('-').map((w) => parseInt(w.trim()));
  if (weights.length === 2) {
    // Si se pudo dividir en dos números, toma el promedio
    return (weights[0] + weights[1]) / 2;
  } else if (weights.length === 1) {
    // Si solo hay un número, úsalo directamente
    return weights[0];
  }
  // En caso de que no se pueda analizar, devuelve 0
  return 0;
};

export const applyFilter = (dogs, selectedWeightFilter) => {
  // Crea una copia de la lista original para evitar modificarla
  let filteredDogs = [...dogs];
  if (selectedWeightFilter === 'higherWeight') {
    // Ordena la lista en sentido descendente por peso
    filteredDogs.sort((a, b) => {
      const weightA = parseWeight(a.weight);
      const weightB = parseWeight(b.weight);
      return weightB - weightA;
    });
  } else if (selectedWeightFilter === 'lowerWeight') {
    // Ordena la lista en sentido ascendente por peso
    filteredDogs.sort((a, b) => {
      const weightA = parseWeight(a.weight);
      const weightB = parseWeight(b.weight);
      return weightA - weightB;
    });
  }
  // Devuelve la lista filtrada y ordenada
  return filteredDogs;
};

export const calculatePaginatedItems = (filterDogs, currentPage, itemsPerPage) => {
  // Calcula los índices de los elementos en la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Devuelve una sub-lista de elementos que pertenecen a la página actual
  const paginatedItems = filterDogs.slice(indexOfFirstItem, indexOfLastItem);
  return paginatedItems;
};

export const applyTemperamentFilter = (dogs, selectedTemperament) => {
  // Si no se ha seleccionado ningún temperamento, devuelve la lista original
  if (!selectedTemperament) {
    return dogs;
  }

  // Filtra la lista de perros para incluir sólo aquellos que tienen el temperamento seleccionado
  const filteredDogs = dogs.filter((dog) => {
    // Divide la cadena de temperamentos en un array si está definida, de lo contrario usa un array vacío
    const temperaments = dog.Temperaments ? dog.Temperaments.split(',').map((temp) => temp.trim()) : [];
    // Comprueba si el temperamento seleccionado está en el array de temperamentos del perro
    return temperaments.includes(selectedTemperament);
  });

  return filteredDogs;
};

export const applyOriginFilter = (dogs, selectedOriginFilter) => {
  let filteredDogs = [...dogs];
  if (selectedOriginFilter === 'API') {
    filteredDogs = filteredDogs.filter((dog) => typeof dog.id === 'number');
  } else if (selectedOriginFilter === 'Database') {
    filteredDogs = filteredDogs.filter((dog) => typeof dog.id === 'string');
  }
  return filteredDogs;
};
