export const simplifiedDatesList = ["DOM", "LUN", "MAR", "MIE", "JUE", "VIE", "SAB"];

export const weekDayList = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];

export const monthList = [
    "Enero", 
    "Febrero", 
    "Marzo", 
    "Abril", 
    "Mayo", 
    "Junio", 
    "Julio", 
    "Agosto", 
    "Septiembre", 
    "Octubre", 
    "Noviembre", 
    "Diciembre"
  ];

export const getSpanishSimplifiedDate = (day: number) => simplifiedDatesList[day]

export const formatDate = (date: Date) => {
  const weekDay = weekDayList[date.getDay()];
  const day = date.getDate();
  const month = monthList[date.getMonth()];
  const year = date.getFullYear();

  return `${weekDay} ${day}, ${month} ${year}`;
}