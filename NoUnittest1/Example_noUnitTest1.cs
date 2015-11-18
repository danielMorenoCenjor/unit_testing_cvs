/*
Imaginemos que tenemos que insertar la información de una persona en la DB

1- Tienes que pedir/inicializar el cliente de BD correspondiente.
2- Crear la conexión 
3- Crear el comando
4- Añadir dos parámetros
5- Ejecutar la query
*/

public int Insert(Person person) { 
	DbProviderFactory factory = SqlClientFactory.Instance; 
	using (DbConnection connection = factory.CreateConnection()) 
	{ 
		connection.ConnectionString = "Server=localhost; Database=myDataBase; Trusted_Connection=True;";
		connection.Open(); 
		using (DbCommand command = connection.CreateCommand()) 
		{ 
			command.CommandText = "insert into PERSON (ID, NAME) values (@Id, @Name)"; 
			command.CommandType = CommandType.Text; 
			
			DbParameter id = command.CreateParameter(); 
			id.ParameterName = "@Id";
			id.DbType = DbType.Int32; 
			id.Value = person.Id; 
			
			DbParameter name = command.CreateParameter(); 
			name.ParameterName = "@Name"; 
			name.DbType = DbType.String; 
			name.Size = 50; 
			name.Value = person.Name;
			 
			command.Parameters.AddRange(new DbParameter[] { id, name });
			int rowsAffected = command.ExecuteNonQuery(); 
			
			return rowsAffected;
		}
	}
}	
		