/*
Imaginemos que tenemos una clase Wolsvagen y queremos pruebar que el grado de polucion
sea el correcto.

El primer problema que nos encontramos es que nos va a petar el metodo GetPollution
no lo hemos echo, es un enfoque TDD, no lo hemos echo.

Otro de los problemas que estamos suponiendo que dara ese valor,
pero ya sabemos que el grado e polucion varia.
*/


/**
Author: DMC
Description: BAD TESTING TDD 1
*/
[TestMethod]
public void TestMethod1()
{
	//Object
	var polo = new Volkswagen("Polo");
	//Action to test
	var result = polo.GetPollution(); //Developing pollution
	// Assert:
	Assert.AreEqual(123, result); // Why 123?
}
//---
public int GetPollution()
{
	var pollution = new Pollution(); // NOT RECOMMENDED
	return pollution.GetMaxCarbonDioxide("Polo");
}

/*
Al no saber si esta terminado de implementar el metodo de GetMaxCarbonDioxide necesitamos
seguir una estrategia de inyeccion. ¿Y cómo lo haremos?
*/

public interface IPollution
{
	int GetMaxCarbonDioxide(string model);
}

public class Volkswagen
{
	private IPollution pollutionControl;
	private String model;
	public Volkswagen (String model, IPollution pollutionControl) {
		this.pollutionControl = pollutionControl;
		this.model = model;
	}
	public int GetPollution ()
	{
		return pollutionControl.GetMaxCarbonDioxide (model);
	}
}

/*
Lo que estamos consiguiendo es no tener una referencia explicita de un componente a otro.

Ahora lo que tenemos que hacer es en el caso de que estemos en en .NET agregar un ensamblado de Fakes
Que se hace automatico, O...

En el caso de que no sepamos o no estemos con Visual Studio .NET
Creamos un Stub manual.
*/

public class PollutionAnalyzerStub : IPollution
{
	public int GetMaxCarbonDioxide (String model){
		return 87823;
	}
}


/*
Ya podemos crear el test
*/
[TestClass]
class TestVehicleAnalyzer
{
    [TestMethod]
    public void TestPollution()
    {
		IPollution pollutionAnalyzer;
		//MOD A:
        // Create the fake pollutionAnalyzer:
        pollutionAnalyzer = 
             new Vehicle.Fakes.StubPollutionAnalyzer() // Generated by Fakes.
                 {
                     // Define each method:
                     // Name is original name + parameter types:
                     GetMaxCarbonDioxide = (model) => { return 87823; }
                 };
		//MOD B:
		//Use stub manually created
		pollutionAnalyzer = new PollutionAnalyzerStub ();

        // In the completed application, pollutionAnalyzer would be a real one:
        var polo = new Volkswagen("Polo", pollutionAnalyzer);

		// Act:
        int value = polo.GetPollution();

		// Assert:
        Assert.AreEqual(87823, value);
    }
    ...
}

/* Si elegimos en Modo A, Microsoft Fakes generará una clase de código auxiliar, en la que nos
permitira implementar nuestros métodos stubs.
Cuando hayamos implementado el código verdadero, pollutionAnalyzer tiene que
ser la implementacion verdadera. */








