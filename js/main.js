// CONTROLE DE ABAS
// responsável por lidar com as abas de estudantes e professores

function handleTabs() {
  const studentsSection = document.getElementById("studentsSection");
  const teachersSection = document.getElementById("teachersSection");

  const tabStudents = document.getElementById("tabStudents");
  const tabTeachers = document.getElementById("tabTeachers");
  tabStudents.addEventListener("click", function () {
    studentsSection.style.display = "block";
    teachersSection.style.display = "none";
  });

  tabTeachers.addEventListener("click", function () {
    studentsSection.style.display = "none";
    teachersSection.style.display = "block";
  });
}

// ESTADO GLOBAL DA APLICAÇÃO
// centraliza os dados e filtros usados na aplicação, evita leitura direta dos dados originais
const state = {
  students: [],
  relationships: [],
  filters: {
    degreeId: null,
    classId: null,
  },
  teachersFilters: {
    degreeId: null,
    classId: null,
  },
};

// INICIALIZAÇÃO DO ESTADO
// cria cópias dos dados originais para evitar mutações diretas
// copiando os alunos para o state
state.students = students.map((student) => {
  return { ...student };
});

// copiando os relacionamentos para o state
state.relationships = relationships.map(function (item) {
  return { ...item };
});

// FUNÇÕES UTILITÁRIAS
// usadas para buscar nomes e informações relacionadas

// função para buscar o nome do professor
function getTeacherName(teacherId) {
  const teacher = teachers.find(function (t) {
    return t.id === teacherId;
  });

  return teacher ? teacher.name : "";
}

// função para buscar o nome da matéria
function getMatterName(matterId) {
  const matter = matters.find(function (m) {
    return m.id === matterId;
  });

  return matter ? matter.name : "";
}

// função para buscar a série
function getDegreeName(degreeId) {
  const degree = degrees.find(function (item) {
    return item.id === degreeId;
  });

  if (!degree) {
    return "";
  }

  return degree.name;
}

// função para buscar a classe
function getClassName(classId) {
  const classItem = classes.find(function (item) {
    return item.id === classId;
  });
  if (!classItem) {
    return "";
  }

  return classItem.name;
}

// função do filtro para a série
function renderDegreeFilter() {
  const select = document.getElementById("degreeFilter");

  degrees.forEach(function (degree) {
    const option = document.createElement("option");
    option.value = degree.id;
    option.textContent = degree.name;
    select.appendChild(option);
  });
}

// função para lidar com a mudança do filtro de série
function handleDegreeFilterChange() {
  const select = document.getElementById("degreeFilter");

  select.addEventListener("change", function () {
    if (select.value === "") {
      state.filters.degreeId = null;
    } else {
      state.filters.degreeId = Number(select.value);
    }

    renderStudents();
  });
}

// função do filtro para a classe
function renderClassFilter() {
  const select = document.getElementById("classFilter");

  classes.forEach(function (classItem) {
    const option = document.createElement("option");
    option.value = classItem.id;
    option.textContent = classItem.name;
    select.appendChild(option);
  });
}

// função para lidar com a mudança do filtro de classe
function handleClassFilterChange() {
  const select = document.getElementById("classFilter");

  select.addEventListener("change", function () {
    if (select.value === "") {
      state.filters.classId = null;
    } else {
      state.filters.classId = Number(select.value);
    }

    renderStudents();
  });
}

// função para mostrar os alunos na tela
function renderStudents() {
  const list = document.getElementById("studentsList");

  //limpa a lista antes de renderizar
  list.innerHTML = "";

  //filtra os alunos com base nos filtros selecionados
  let filteredStudents = state.students;

  if (state.filters.degreeId !== null) {
    filteredStudents = filteredStudents.filter((student) => {
      return student.degreeId === state.filters.degreeId;
    });
  }

  if (state.filters.classId !== null) {
    filteredStudents = filteredStudents.filter((student) => {
      return student.classId === state.filters.classId;
    });
  }

  // renderiza os alunos filtrados
  filteredStudents.forEach((student) => {
    const li = document.createElement("li");

    const degreeName = getDegreeName(student.degreeId);
    const className = getClassName(student.classId);

    li.textContent =
      student.name + " - " + degreeName + " - Classe " + className;

    // adicionando botão de editar
    const editButton = document.createElement("button");
    editButton.textContent = "Editar";

    // adiciona evento de clique ao botão de editar
    editButton.addEventListener("click", function () {
      editStudent(student.id);
    });

    li.appendChild(editButton);
    list.appendChild(li);
  });
}

// função para editar o aluno
function editStudent(studentId) {
  const student = state.students.find(function (item) {
    return item.id === studentId;
  });

  if (!student) {
    alert("Aluno não encontrado!");
    return;
  }

  const newName = prompt("Digite o novo nome do aluno:", student.name);

  if (newName !== null && newName !== "") {
    student.name = newName;
  }

  //  editar classe do aluno
  const newClass = prompt(
    "Digite o número da nova classe do aluno:\n" + getClassesText(),
    student.classId,
  );

  if (newClass !== null && newClass !== "") {
    student.classId = Number(newClass);
  }

  renderStudents();
  renderTeachers();
}

// função para obter o id das classes
function getClassesText() {
  let text = "";

  classes.forEach(function (item) {
    text += item.id + " - " + item.name + "\n";
  });

  return text;
}

// função para gerar alunos aleatórios
function generateStudents(amount) {
  let lastId = state.students[state.students.length - 1].id;

  for (let i = 0; i < amount; i++) {
    lastId++;

    const randomDegree = degrees[Math.floor(Math.random() * degrees.length)];

    const randomClass = classes[Math.floor(Math.random() * classes.length)];

    const newStudent = {
      id: lastId,
      ra: Math.floor(Math.random() * 1000000),
      name: "Aluno " + lastId,
      degreeId: randomDegree.id,
      classId: randomClass.id,
    };

    state.students.push(newStudent);
  }

  renderStudents();
  renderChart();
  renderTeachers();
}

// função para lidar com o clique no botão de gerar alunos
function handleGenerateStudents() {
  const button = document.getElementById("generateStudents");

  button.addEventListener("click", function () {
    generateStudents(300);
  });
}

// função para contar alunos por série
function countStudentsByDegree() {
  const result = [];

  degrees.forEach(function (degree) {
    const total = state.students.filter(function (student) {
      return student.degreeId === degree.id;
    }).length;

    result.push({
      name: degree.name,
      total: total,
    });
  });

  return result;
}

// função para renderizar o gráfico
function renderChart() {
  const chart = document.getElementById("chart");
  chart.innerHTML = "";

  const data = countStudentsByDegree();

  data.forEach(function (item) {
    const row = document.createElement("div");
    row.style.marginBottom = "8px";

    const label = document.createElement("span");
    label.textContent = item.name + " (" + item.total + "): ";
    label.style.display = "inline-block";
    label.style.width = "200px";

    const bar = document.createElement("div");
    bar.style.display = "inline-block";
    bar.style.height = "20px";
    bar.style.backgroundColor = "blue";
    bar.style.width = item.total + "px";

    row.appendChild(label);
    row.appendChild(bar);
    chart.appendChild(row);
  });
}

// função para renderizar os professores e suas matérias
function renderTeachers() {
  const container = document.getElementById("teacherList");
  container.innerHTML = "";

  let filteredRelation = state.relationships;

  if (state.teachersFilters.degreeId !== null) {
    filteredRelation = filteredRelation.filter(function (relation) {
      return relation.degrees.some(function (degreeItem) {
        return degreeItem.degreeId === state.teachersFilters.degreeId;
      });
    });
  }

  if (state.teachersFilters.classId !== null) {
    filteredRelation = filteredRelation.filter(function (relation) {
      return relation.degrees.some(function (degreeItem) {
        return degreeItem.classes.some(function (classItem) {
          const classId = classItem.classPosition || classItem.classId;
          return classId === state.teachersFilters.classId;
        });
      });
    });
  }

  filteredRelation.forEach(function (relation) {
    // título do professor e matéria
    const title = document.createElement("strong");
    title.textContent =
      getTeacherName(relation.teacherId) +
      " - " +
      getMatterName(relation.matterId);

    container.appendChild(title);

    // detalhes das séries e classes
    relation.degrees.forEach(function (degreeItem) {
      const p = document.createElement("p");

      const degreeName = getDegreeNameById(degreeItem.degreeId);
      const classNames = getClassNamesByPositions(degreeItem.classes);

      p.textContent = "Série: " + degreeName + " - Classes: " + classNames;

      const button = document.createElement("button");
      button.textContent = "Ver alunos";

      const studentsContainer = document.createElement("div");
      studentsContainer.style.marginTop = "8px";

      button.addEventListener("click", function () {
        if (studentsContainer.innerHTML !== "") {
          studentsContainer.innerHTML = "";
        } else {
          renderStudentsList(studentsContainer, degreeItem.degreeId);
        }
      });

      p.appendChild(button);
      p.appendChild(studentsContainer);

      container.appendChild(p);
    });

    // espaçamento entre professores
    container.appendChild(document.createElement("hr"));
  });
}

// função para buscar o nome da série por id
function getDegreeNameById(degreeId) {
  const degree = degrees.find(function (d) {
    return d.id === degreeId;
  });

  return degree ? degree.name : "";
}

// função para buscar os nomes das classes por seus ids
function getClassNamesByPositions(classList) {
  return classList
    .map(function (item) {
      const classId = item.classPosition || item.classId;
      return getClassName(classId);
    })
    .join(", ");
}

// função para lidar com os filtros dos professores
function handleTeachersFilter() {
  const degreeSelect = document.getElementById("teacherDegreeFilter");
  const classSelect = document.getElementById("teacherClassFilter");

  degreeSelect.addEventListener("change", function () {
    state.teachersFilters.degreeId =
      degreeSelect.value === "" ? null : Number(degreeSelect.value);

    renderTeachers();
  });

  classSelect.addEventListener("change", function () {
    state.teachersFilters.classId =
      classSelect.value === "" ? null : Number(classSelect.value);

    renderTeachers();
  });
}

// função do filtro para a série dos professores
function renderTeacherDegreeFilter() {
  const select = document.getElementById("teacherDegreeFilter");

  degrees.forEach(function (degree) {
    const option = document.createElement("option");
    option.value = degree.id;
    option.textContent = degree.name;
    select.appendChild(option);
  });
}

// função do filtro para a classe dos professores
function renderTeacherClassFilter() {
  const select = document.getElementById("teacherClassFilter");

  classes.forEach(function (classItem) {
    const option = document.createElement("option");
    option.value = classItem.id;
    option.textContent = classItem.name;
    select.appendChild(option);
  });
}

// função para obter alunos por série
function getStudentsByDegree(degreeId) {
  return state.students.filter(function (student) {
    return student.degreeId === degreeId;
  });
}

// função para renderizar a lista de alunos por série
function renderStudentsList(container, degreeId) {
  container.innerHTML = "";

  const students = getStudentsByDegree(degreeId);

  const ul = document.createElement("ul");

  if (students.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Nenhum aluno encontrado.";
    ul.appendChild(li);
  } else {
    students.forEach(function (student) {
      const li = document.createElement("li");
      li.textContent = student.name;
      ul.appendChild(li);
    });
  }

  container.appendChild(ul);
}

// função para renderizar as opções de professores no formulário de edição
function renderNewTeacherOptions() {
  const select = document.getElementById("newTeacher");
  select.innerHTML = "";

  teachers.forEach(function (teacher) {
    const option = document.createElement("option");
    option.value = teacher.id;
    option.textContent = teacher.name;
    select.appendChild(option);
  });
}

// função para renderizar as opções de matérias no formulário de edição
function renderNewMatterOptions() {
  const select = document.getElementById("newMatter");
  select.innerHTML = "";

  matters.forEach(function (matter) {
    const option = document.createElement("option");
    option.value = matter.id;
    option.textContent = matter.name;
    select.appendChild(option);
  });
}

// função para renderizar as opções de séries no formulário de edição
function renderNewDegreeOptions() {
  const select = document.getElementById("newDegree");
  select.innerHTML = "";

  degrees.forEach(function (degree) {
    const option = document.createElement("option");
    option.value = degree.id;
    option.textContent = degree.name;
    select.appendChild(option);
  });
}

// função para renderizar as opções de classes no formulário de edição
function renderNewClassOptions() {
  const select = document.getElementById("newClass");
  select.innerHTML = "";

  classes.forEach(function (classItem) {
    const option = document.createElement("option");
    option.value = classItem.id;
    option.textContent = classItem.name;
    select.appendChild(option);
  });
}

// função para lidar com a criação de novos relacionamentos
function handleRelationship() {
  const teacherSelect = document.getElementById("newTeacher");
  const matterSelect = document.getElementById("newMatter");
  const degreeSelect = document.getElementById("newDegree");
  const classSelect = document.getElementById("newClass");

  const teacherId = Number(teacherSelect.value);
  const matterId = Number(matterSelect.value);
  const degreeId = Number(degreeSelect.value);
  const classId = Number(classSelect.value);

  const newRelationship = {
    teacherId: teacherId,
    matterId: matterId,
    degrees: [
      {
        degreeId: degreeId,
        classes: [{ classId: classId }],
      },
    ],
  };

  state.relationships.push(newRelationship);

  renderTeachers();
}

function handleAddRelationshipClick() {
  const button = document.getElementById("addRelationship");

  button.addEventListener("click", function () {
    handleRelationship();
  });
}

// renderização
renderDegreeFilter();
renderClassFilter();
renderTeacherDegreeFilter();
renderTeacherClassFilter();

handleDegreeFilterChange();
handleClassFilterChange();
handleTeachersFilter();
handleGenerateStudents();
handleTabs();
handleAddRelationshipClick();

renderNewClassOptions();
renderNewTeacherOptions();
renderNewMatterOptions();
renderNewDegreeOptions();

renderStudents();
renderChart();
renderTeachers();
