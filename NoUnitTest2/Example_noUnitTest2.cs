/*

Un test unitario puro, no debería probar fragmentos de código que llamen a otros métodos. En una situación idílica.
¿Que pada si hiciéramos nuestro test unitario sobre SelectedMasters?
Tenemos 3 razones por las que no hacer esto.
1- No recibe parámetros, obtiene valores de un DataGrid y de un ComboBox -> No podemos flexibilizar la entrada.
2- Hace sucesivas llamadas a otros métodos que potencialmente esas son unitarios.
3- Uno de los métodos involucra a la interfaz gráfica (ShowNavigateToMaster)  

Pero no siempre se puede evitar esto, algunas veces el método a probar accede a propiedades de otras clases, y esto hay que tenerlo en consideración a la hora de realizar las pruebas.
En este ejemplo, no nos basta con hacer una prueba únicamente a SelectedMasters, tendremos que hacer subpruebas unitarias.

*/


public void SelectedMasters() { 
	string currentEntity = dgvModel.DataMember; 
	string navToEntity = cbMasterTables.SelectedItem.ToString(); 
	DataGridViewSelectedRowCollection selectedRows = dgvModel.SelectedRows; 
	
	StringBuilder qualifier = BuildQualifier(selectedRows); 
	UpdateGrid(navToEntity); 
	SetRowFilter(navToEntity, qualifier.ToString()); 
	ShowNavigateToMaster(navToEntity, qualifier.ToString());
}