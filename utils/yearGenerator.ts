export function year() {
    const dropDownYear = []
    const yearNow = new Date().getFullYear()
    let startYear = yearNow - 20;
    for (startYear; startYear <= yearNow; startYear++) {
        dropDownYear.push(startYear)
        console.log(startYear)
    }
    return dropDownYear
}