const Employee = require('../employee.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
    before(async () => {
        try {
          await mongoose.connect('mongodb://localhost:27017/companyDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
        } catch(err) {
          console.error(err);
        }
    });
    describe('Reading data', () => {
        before(async () => {
          const testDepOne = new Employee({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'Employee #1' });
          await testDepOne.save();
      
          const testDepTwo = new Employee({ firstName: 'Employee #2', lastName: 'Employee #2', department: 'Employee #2' });
          await testDepTwo.save();
        });
        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
          });
        it('should return a proper document by "firstName,lastName,department" with "findOne" method', async () => {
            const expectedEmployeeData = { firstName: 'Employee #1', lastName: 'Employee #1', department: 'Employee #1'};
            for (let key in expectedEmployeeData) {
              const value = expectedEmployeeData[key];
              const employee = await Employee.findOne({ [key]: value });
              expect(employee.firstName).to.be.equal(expectedEmployeeData.firstName);
            }
        });
        after(async () => {
            await Employee.deleteMany();
        });
      });
      describe('Creating data', () => {
        it('should insert new document with "insertOne" method', async () => {
          const employee = new Employee({ firstName: 'Employee #1', lastName: 'Test1', department: 'Test1' });
          await employee.save();
          expect(employee.isNew).to.be.false;
        });
        after(async () => {
            await Employee.deleteMany();
          });
      });
      describe('Updating data', () => {
        beforeEach(async () => {
            const testDepOne = new Employee({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'Employee #1' });
            await testDepOne.save();
            const testDepTwo = new Employee({ firstName: 'Employee #1', lastName: 'Employee #1', department: 'Employee #1' });
            await testDepTwo.save();
          });
        afterEach(async () => {
            await Employee.deleteMany();
        });
        it('should properly update one document with "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'Employee #1'}, { $set: { firstName: '=Employee #1='}});
            const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=' });
            expect(updatedEmployee).to.not.be.null;
        });
        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ firstName: 'Employee #1' });
            employee.firstName = '=Employee #1=';
            await employee.save();
          
            const updatedEmployee = await Employee.findOne({ firstName: '=Employee #1=' });
            expect(updatedEmployee).to.not.be.null;
          });
          it('should properly update multiple documents with "updateMany" method', async () => {
            await Employee.updateMany({}, { $set: { firstName: 'Updated!' }});
            const employees = await Employee.find();
            expect(employees[0].firstName).to.be.equal('Updated!');
            expect(employees[1].firstName).to.be.equal('Updated!');
          });
          
      });
      describe('Removing data', () => {
        beforeEach(async () => {
          const testEmpOne = new Employee({ firstName: 'Employee #1', lastName: 'Test1', department: 'Test1' });
          await testEmpOne.save();
  
          const testEmpTwo = new Employee({ firstName: 'Employee #2', lastName: 'Test2', department: 'Test2' });
          await testEmpTwo.save();
        });
  
        afterEach(async () => {
          await Employee.deleteMany();
        });
  
        it('should properly remove one document with "deleteOne" method', async () => {
          await Employee.deleteOne({ firstName: 'Employee #1' });
          const emp = await Employee.findOne({ firstName: 'Employee #1' });
          expect(emp).to.be.null;
        });
  
        it('should properly remove one document with "remove" method', async () => {
          const employee = await Employee.findOne({ firstName: 'Employee #1' });
          await employee.remove();
          const removedEmployee = await Employee.findOne({ firstName: 'Employee #1' });
          expect(removedEmployee).to.be.null;
        });
  
        it('should properly remove multiple documents with "deleteMany" method', async () => {
          await Employee.deleteMany();
          const employees = await Employee.find();
          expect(employees.length).to.equal(0);
        });
      });
    after(() => {
        mongoose.models = {};
      });
});