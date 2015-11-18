BUG-DETECTION / CODE FIRST TEST SECOND


/*Implementacion de una division en el que no se ha tenido en cuenta que el denominador puede ser 0 */
public static int Divide(int numerator, int denominator)
{
	return numerator / denominator;
}

//Se utiliza la funcion y el programa falla de forma no controlada, sospechamos que puede ser por un tipo de error, lo probamos

/*Test negativo en el que se fuerza a que falle*/
[TestMethod] 
[ExpectedException(typeof(DivideByZeroException))] 
public void BadParameterTest() { 
	Divide(5, 0); 
}

//El test funciona, por lo tanto estabamos en lo cierto, tenemos que corregir el error en los casos del denominador 0

public static int Divide(int numerator, int denominator)
{
	if (denominator == 0) {
		throw new MyException("Denominator cannot be 0."); 
	}
	return numerator / denominator;
}

/*Una vez que hemos corregido el error escribimos el test positivo*/
[TestMethod] 
[ExpectedException(typeof(MyException))] 
public void BadParameterTest() { 
	Divide(5, 0);
}

/*Y me preguntareis, si estamos esperando una excepcion, ¿Cómo va a ser un test positivo?
Pues porque esa excepcion se lanza de forma controlada, el programador lo ha tenido que tener en cuenta
para que se retorne o lance ese resultado o excepcion.*/