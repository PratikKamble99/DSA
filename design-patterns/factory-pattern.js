// The Factory Pattern is a creational design pattern that provides a way to create objects without specifying the exact class or constructor function of the object that will be created.

// Implementation 1: The Idiomatic JS Way (Functional)
// 1. The varying implementations
const createDeveloper = (name) => ({
    name,
    type: "Developer",
    task: () => console.log(`${name} is fixing bugs.`),
});

const createTester = (name) => ({
    name,
    type: "Tester",
    task: () => console.log(`${name} is testing code.`),
});

// 2. The Factory Function
const EmployeeFactory = (name, type) => {
    switch (type) {
        case "developer":
            return createDeveloper(name);
        case "tester":
            return createTester(name);
        default:
            console.warn("Unknown type, defaulting to generic employee");
            return {
                name,
                type: "Generic",
                task: () => console.log(`${name} is working.`),
            };
    }
};

// 3. Usage
const dev = EmployeeFactory("Alice", "developer");
const tester = EmployeeFactory("Bob", "tester");

dev.task(); // Output: Alice is fixing bugs.
tester.task(); // Output: Bob is testing code.

//Implementation 2: The Class-Based Way (OOP)
class Car {
    drive() {
        console.log("Driving a car...");
    }
}

class Truck {
    drive() {
        console.log("Driving a heavy truck...");
    }
}

// The Factory Class
class VehicleFactory {
    // This method controls the logic of creation
    createVehicle(vehicleType) {
        if (vehicleType === "car") {
            return new Car();
        } else if (vehicleType === "truck") {
            return new Truck();
        } else {
            throw new Error("Vehicle type not supported.");
        }
    }
}

// Usage
const factory = new VehicleFactory();

const myCar = factory.createVehicle("car");
const myTruck = factory.createVehicle("truck");

myCar.drive(); // Output: Driving a car...
myTruck.drive(); // Output: Driving a heavy truck...
