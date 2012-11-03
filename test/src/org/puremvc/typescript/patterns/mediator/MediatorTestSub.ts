///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>

module test
{
	"use strict";

	/**
	 * A <code>Mediator</code> utility subclass used by <code>MediatorTest</code>.
	 */
	export class MediatorTestSub
		extends Mediator
		implements puremvc.IMediator
	{
		/**
		 * A method to test if <code>Facade</code> instance of the object has well been declared
		 * during its construction.
		 *
		 * @return
		 * 		<code>Facade</code> instance of the object has well been declared during its
		 * 		construction.
		 */
		hasFacade():bool
		{
			return this.facade instanceof Facade;
		}
	}
}