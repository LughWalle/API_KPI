// Função para calcular o headcount total em um determinado mês
function calcularHeadcount(employees, year, month) {
  return employees.filter(
    (employee) =>
      employee.status === 'ativo' &&
      new Date(employee.data_de_admissão).getFullYear() <= year &&
      new Date(employee.data_de_admissão).getMonth() <= month &&
      (!employee.data_de_rescisão ||
        (new Date(employee.data_de_rescisão).getFullYear() >= year &&
          new Date(employee.data_de_rescisão).getMonth() >= month))
  ).length;
}

// Função para calcular o turnover em um determinado mês
function calcularTurnover(employees, year, month) {
  const totalEmployees = employees.filter(
    (employee) =>
      new Date(employee.data_de_admissão).getFullYear() <= year &&
      new Date(employee.data_de_admissão).getMonth() <= month
  ).length;

  const employeesRescinded = employees.filter(
    (employee) =>
      employee.status === 'inativo' &&
      new Date(employee.data_de_rescisão).getFullYear() === year &&
      new Date(employee.data_de_rescisão).getMonth() === month
  ).length;

  return Math.round((employeesRescinded / totalEmployees) * 100);
}

function obterNomeMes(month) {
  const meses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  return meses[month];
}

function calcularHeadcountETurnoverPorMes(employees, type) {
  const monthsData = [];

  // Encontre o mês mais recente com base nas datas de rescisão
  const maxRescissionDate = new Date(Math.max(...employees.map((employee) => (employee.data_de_rescisão ? new Date(employee.data_de_rescisão) : new Date()))));

  // Loop pelos meses a partir da data de admissão mais antiga até o mês mais recente
  const minAdmissionDate = new Date(Math.min(...employees.map((employee) => new Date(employee.data_de_admissão))));
  const minYear = minAdmissionDate.getFullYear();
  const minMonth = minAdmissionDate.getMonth();

  const maxYear = maxRescissionDate.getFullYear();
  const maxMonth = maxRescissionDate.getMonth();

  for (let year = minYear; year <= maxYear; year++) {
    const startMonth = year === minYear ? minMonth : 0;
    const endMonth = year === maxYear ? maxMonth : 11; // Dezembro (11) se for o ano mais recente

    for (let month = startMonth; month <= endMonth; month++) {
      const monthName = obterNomeMes(month);
      const result = type === 'HC' ? calcularHeadcount(employees, year, month) : calcularTurnover(employees, year, month);

      monthsData.push({ x: `${monthName}/${year}`, y: result});
    }
  }

  return monthsData;
}

module.exports = { calcularHeadcountETurnoverPorMes };