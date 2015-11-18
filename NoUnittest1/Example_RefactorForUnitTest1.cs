/*
Con los test unitarios debemos probar algo en concreto. ¿Por qué? Pues porque cuanto más acotemos la prueba, más cerca estaremos de identificar el fallo en caso de reporte de error.

Estamos haciendo algo en concreto, ¿No?

1- Tienes que pedir/inicializar el cliente de BD correspondiente.
2- Crear la conexión.
3- Crear el comando.
4- Añadir dos parámetros.
5- Ejecutar la query.

*/

l
public int RefactoredInsert(Person person) 
{ 
	DbProviderFactory factory = SqlClientFactory.Instance; 
	using (DbConnection conn = OpenConnection(factory, "Server=localhost; Database=myDataBase; Trusted_Connection=True;")) 
	{ 
		using (DbCommand cmd = CreateTextCommand(conn, "insert into PERSON (ID, NAME) values (@Id, @Name)")) 
		{
			AddParameter(cmd, "@Id", person.Id);
			AddParameter(cmd, "@Name", 50, person.Name); 
			int rowsAffected = cmd.ExecuteNonQuery();
		 	
			return rowsAffected; 
		} 
	} 
}

protected DbConnection OpenConnection(DbProviderFactory factory, string connectString) 
{
	DbConnection conn = factory.CreateConnection(); 
	conn.ConnectionString = connectString; 
	conn.Open(); 
	
	return conn; 
}

protected DbCommand CreateTextCommand(DbConnection conn, string cmdText) 
{ 
	DbCommand cmd = conn.CreateCommand(); 
	cmd.CommandText = cmdText; 
	cmd.CommandType = CommandType.Text; 
	
	return cmd; 
}

protected void AddParameter(DbCommand cmd, string paramName, int paramValue) 
{ 
	DbParameter param = cmd.CreateParameter(); 
	param.ParameterName = paramName; 
	param.DbType = DbType.Int32; 
	param.Value = paramValue; 
	cmd.Parameters.Add(param); 
}

protected void AddParameter(DbCommand cmd, string paramName, int size, string paramValue) 
{ 
	DbParameter param = cmd.CreateParameter(); 
	param.ParameterName = paramName; 
	param.DbType = DbType.String; 
	param.Size = size; 
	param.Value = paramValue; 
	cmd.Parameters.Add(param); 
}