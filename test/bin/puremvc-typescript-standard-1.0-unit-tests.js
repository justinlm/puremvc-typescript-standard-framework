if( typeof define === "function" )
{
	define( "test", ['YUITest','puremvc'], function(YUITest,puremvc)
	{
        var __extends = (this && this.__extends) || (function () {
            var extendStatics = function (d, b) {
                extendStatics = Object.setPrototypeOf ||
                    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var test;
        (function (test) {
            "use strict";
            /**
             * A utility class used by ControllerTest.
             */
            var ControllerTestVO = /** @class */ (function () {
                /**
                 * Constructs a <code>ControllerTestVO</code> instance.
                 *
                 * @param input
                 *		The number to be fed to the <code>ControllerTestCommand</code>.
                 */
                function ControllerTestVO(input) {
                    /**
                     * Will be used to store the number to pass to the command.
                     */
                    this.input = 0;
                    /**
                     * Will be used to read the result calculated by the command.
                     */
                    this.result = 0;
                    this.input = input;
                }
                return ControllerTestVO;
            }());
            test.ControllerTestVO = ControllerTestVO;
        })(test || (test = {}));
        ///<reference path='../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='ControllerTestVO.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A SimpleCommand subclass used by ControllerTest.
             */
            var ControllerTestCommand2 = /** @class */ (function (_super) {
                __extends(ControllerTestCommand2, _super);
                function ControllerTestCommand2() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * Fabricate a result by multiplying the input by 2 and adding to the existing result.
                 *
                 * This tests accumulation effect that would show if the command were executed more than
                 * once.
                 *
                 * @param notification
                 * 		The notification carrying the ControllerTestVO.
                 */
                ControllerTestCommand2.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    // Fabricate a result
                    vo.result = vo.result + (2 * vo.input);
                };
                return ControllerTestCommand2;
            }(puremvc.SimpleCommand));
            test.ControllerTestCommand2 = ControllerTestCommand2;
        })(test || (test = {}));
        ///<reference path='../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='ControllerTestVO.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A <code>SimpleCommand</code> subclass used by <code>ControllerTest</code>.
             */
            var ControllerTestCommand = /** @class */ (function (_super) {
                __extends(ControllerTestCommand, _super);
                function ControllerTestCommand() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * Fabricate a result by multiplying the input by 2.
                 *
                 * @param notification
                 * 		The notification carrying the ControllerTestVO
                 */
                ControllerTestCommand.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    // Fabricate a result
                    vo.result = 2 * vo.input;
                };
                return ControllerTestCommand;
            }(puremvc.SimpleCommand));
            test.ControllerTestCommand = ControllerTestCommand;
        })(test || (test = {}));
        ///<reference path='../../../../../../test/lib/YUITest.d.ts'/>
        ///<reference path='../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='ControllerTestVO.ts'/>
        ///<reference path='ControllerTestCommand2.ts'/>
        ///<reference path='ControllerTestCommand.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * Test the PureMVC Controller class.
             */
            var ControllerTest = /** @class */ (function () {
                function ControllerTest() {
                    /**
                     * The name of the test case - if not provided, one is automatically generated by the
                     * YUITest framework.
                     */
                    this.name = "PureMVC Controller class tests";
                }
                /**
                 * Tests the <code>Controller</code> singleton Factory Method
                 */
                ControllerTest.prototype.testGetInstance = function () {
                    // Test Factory Method
                    var controller = puremvc.Controller.getInstance();
                    // test assertions
                    YUITest.Assert.isNotNull(controller, "Expecting instance !== null");
                    YUITest.Assert.isInstanceOf(puremvc.Controller, controller, "Expecting instance extends Controller");
                };
                /**
                 * Tests Command registration and execution.
                 *
                 *
                 * This test gets the singleton Controller instance and registers the ControllerTestCommand
                 * class to handle 'ControllerTest' Notifications.
                 *
                 * It then constructs such a Notification and tells the Controller to execute the associated
                 * Command. Success is determined by evaluating a property on an object passed to the
                 * Command, which will be modified when the Command executes.
                 */
                ControllerTest.prototype.testRegisterAndExecuteCommand = function () {
                    // Create the controller, register the ControllerTestCommand to handle 'ControllerTest' notifications
                    var controller = puremvc.Controller.getInstance();
                    controller.registerCommand('ControllerTest', test.ControllerTestCommand);
                    // Create a 'ControllerTest' notification
                    var vo = new test.ControllerTestVO(12);
                    var notification = new puremvc.Notification('ControllerTest', vo);
                    // Tell the controller to execute the Command associated with the notification
                    // the ControllerTestCommand invoked will multiply the vo.input value
                    // by 2 and set the result on vo.result
                    controller.executeCommand(notification);
                    // test assertions
                    YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
                };
                /**
                 * Tests Command registration and removal.
                 *
                 * Tests that once a Command is registered and verified working, it can be removed from the
                 * Controller.
                 */
                ControllerTest.prototype.testRegisterAndRemoveCommand = function () {
                    // Create the controller, register the ControllerTestCommand to handle 'ControllerTest' notifications
                    var controller = puremvc.Controller.getInstance();
                    controller.registerCommand('ControllerRemoveTest', test.ControllerTestCommand);
                    // Create a 'ControllerTest' notification
                    var vo = new test.ControllerTestVO(12);
                    var notification = new puremvc.Notification('ControllerRemoveTest', vo);
                    // Tell the controller to execute the Command associated with the notification
                    // the ControllerTestCommand invoked will multiply the vo.input value
                    // by 2 and set the result on vo.result
                    controller.executeCommand(notification);
                    // test assertions
                    YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
                    // Reset result
                    vo.result = 0;
                    // Remove the Command from the Controller
                    controller.removeCommand('ControllerRemoveTest');
                    // Tell the controller to execute the Command associated with the
                    // notification. This time, it should not be registered, and our vo result
                    // will not change
                    controller.executeCommand(notification);
                    // test assertions
                    YUITest.Assert.areEqual(0, vo.result, "Expecting vo.result == 0");
                };
                /**
                 * Test hasCommand method.
                 */
                ControllerTest.prototype.testHasCommand = function () {
                    // register the ControllerTestCommand to handle 'hasCommandTest' notifications
                    var controller = puremvc.Controller.getInstance();
                    controller.registerCommand('hasCommandTest', test.ControllerTestCommand);
                    // test that hasCommand returns true for hasCommandTest notifications
                    YUITest.Assert.isTrue(controller.hasCommand('hasCommandTest'), "Expecting controller.hasCommand('hasCommandTest') === true");
                    // Remove the Command from the Controller
                    controller.removeCommand('hasCommandTest');
                    // test that hasCommand returns false for hasCommandTest notifications
                    YUITest.Assert.isFalse(controller.hasCommand('hasCommandTest'), "Expecting controller.hasCommand('hasCommandTest') === false");
                };
                /**
                 * Tests Removing and Reregistering a Command
                 *
                 * Tests that when a command is re-registered that it isn't fired twice. This involves,
                 * minimally, registration with the controller but notification via the <code>View</code>,
                 * rather than direct execution of the <code>Controller</code>'s executeCommand method as is
                 * done above in <code>testRegisterAndRemove</code>.
                 */
                ControllerTest.prototype.testReregisterAndExecuteCommand = function () {
                    // Fetch the controller, register the ControllerTestCommand2 to handle 'ControllerTest2' notifications
                    var controller = puremvc.Controller.getInstance();
                    controller.registerCommand('ControllerTest2', test.ControllerTestCommand2);
                    // Remove the Command from the Controller
                    controller.removeCommand('ControllerTest2');
                    // Re-register the Command with the Controller
                    controller.registerCommand('ControllerTest2', test.ControllerTestCommand2);
                    // Create a 'ControllerTest2' notification
                    var vo = new test.ControllerTestVO(12);
                    var notification = new puremvc.Notification('ControllerTest2', vo);
                    // retrieve a reference to the View.
                    var view = puremvc.View.getInstance();
                    // send the Notification
                    view.notifyObservers(notification);
                    // test assertions
                    // if the command is executed once the value will be 24
                    YUITest.Assert.areEqual(24, vo.result, "Expecting vo.result == 24");
                    // Prove that accumulation works in the VO by sending the notification again
                    view.notifyObservers(notification);
                    // if the command is executed twice the value will be 48
                    YUITest.Assert.areEqual(48, vo.result, "Expecting vo.result == 48");
                };
                return ControllerTest;
            }());
            test.ControllerTest = ControllerTest;
        })(test || (test = {}));
        ///<reference path='../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A <code>Proxy</code> subclass used by <code>ModelTest</code> testCase.
             */
            var ModelTestProxy = /** @class */ (function (_super) {
                __extends(ModelTestProxy, _super);
                /**
                 * Constructs a <code>ModelTestProxy</code> instance passing super its default name and
                 * an empty string initializer.
                 */
                function ModelTestProxy() {
                    return _super.call(this, ModelTestProxy.NAME, '') || this;
                }
                /**
                 * @override.
                 */
                ModelTestProxy.prototype.onRegister = function () {
                    this.setData(ModelTestProxy.ON_REGISTER_CALLED);
                };
                /**
                 * @override.
                 */
                ModelTestProxy.prototype.onRemove = function () {
                    this.setData(ModelTestProxy.ON_REMOVE_CALLED);
                };
                /**
                 * @constant
                 */
                ModelTestProxy.NAME = 'ModelTestProxy';
                /**
                 * @constant
                 */
                ModelTestProxy.ON_REGISTER_CALLED = 'onRegister Called';
                /**
                 * @constant
                 */
                ModelTestProxy.ON_REMOVE_CALLED = 'onRemove Called';
                return ModelTestProxy;
            }(puremvc.Proxy));
            test.ModelTestProxy = ModelTestProxy;
        })(test || (test = {}));
        ///<reference path='../../../../../../test/lib/YUITest.d.ts'/>
        ///<reference path='../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='ModelTestProxy.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * Test the PureMVC Model class.
             */
            var ModelTest = /** @class */ (function () {
                function ModelTest() {
                    /**
                     * The name of the test case - if not provided, one is automatically generated by the
                     * YUITest framework.
                     */
                    this.name = "PureMVC Model class tests";
                }
                /**
                 * Tests the Model singleton Factory Method.
                 */
                ModelTest.prototype.testGetInstance = function () {
                    // Test Factory Method
                    var model = puremvc.Model.getInstance();
                    // test assertions
                    YUITest.Assert.isNotNull(model, "Expecting instance !== null");
                    YUITest.Assert.isInstanceOf(puremvc.Model, model, "Expecting instance extends Model");
                };
                /**
                 * Tests the proxy registration and retrieval methods.
                 *
                 * Tests <code>registerProxy</code> and <code>retrieveProxy</code> in
                 * the same test. These methods cannot currently be tested separately
                 * in any meaningful way other than to show that the methods do not
                 * throw exception when called.
                 */
                ModelTest.prototype.testRegisterAndRetrieveProxy = function () {
                    // register a proxy and retrieve it.
                    var model = puremvc.Model.getInstance();
                    model.registerProxy(new puremvc.Proxy('colors', ['red', 'green', 'blue']));
                    var proxy = model.retrieveProxy('colors');
                    var data = proxy.getData();
                    // test assertions
                    YUITest.Assert.isNotNull(data, "Expecting data !== null");
                    YUITest.Assert.isArray(data, "Expecting data type is Array");
                    YUITest.Assert.areEqual(3, data.length, "Expecting data.length == 3");
                    YUITest.Assert.areEqual('red', data[0], "Expecting data[0] == 'red'");
                    YUITest.Assert.areEqual('green', data[1], "Expecting data[1] == 'green'");
                    YUITest.Assert.areEqual('blue', data[2], "Expecting data[2] == 'blue'");
                };
                /**
                 * Tests the proxy removal method.
                 */
                ModelTest.prototype.testRegisterAndRemoveProxy = function () {
                    // register a proxy, remove it, then try to retrieve it
                    var model = puremvc.Model.getInstance();
                    var proxy = new puremvc.Proxy('sizes', ['7', '13', '21']);
                    model.registerProxy(proxy);
                    // remove the proxy
                    var removedProxy = model.removeProxy('sizes');
                    // assert that we removed the appropriate proxy
                    YUITest.Assert.areEqual('sizes', removedProxy.getProxyName(), "Expecting removedProxy.getProxyName() == 'sizes'");
                    // ensure that the proxy is no longer retrievable from the model
                    proxy = model.retrieveProxy('sizes');
                    // test assertions
                    YUITest.Assert.isNull(proxy, "Expecting proxy === null");
                };
                /**
                 * Tests the hasProxy Method.
                 */
                ModelTest.prototype.testHasProxy = function () {
                    // register a proxy
                    var model = puremvc.Model.getInstance();
                    var proxy = new puremvc.Proxy('aces', ['clubs', 'spades', 'hearts', 'diamonds']);
                    model.registerProxy(proxy);
                    // assert that the model.hasProxy method returns true
                    // for that proxy name
                    YUITest.Assert.isTrue(model.hasProxy('aces'), "Expecting model.hasProxy('aces') === true");
                    // remove the proxy
                    model.removeProxy('aces');
                    // assert that the model.hasProxy method returns false
                    // for that proxy name
                    YUITest.Assert.isFalse(model.hasProxy('aces'), "Expecting model.hasProxy('aces') === false");
                };
                /**
                 * Tests that the Model calls the onRegister and onRemove methods.
                 */
                ModelTest.prototype.testOnRegisterAndOnRemove = function () {
                    // Get the singleton View instance
                    var model = puremvc.Model.getInstance();
                    // Create and register the test mediator
                    var proxy = new test.ModelTestProxy();
                    model.registerProxy(proxy);
                    // assert that onRegister was called, and the proxy responded by setting its data accordingly
                    YUITest.Assert.areEqual(test.ModelTestProxy.ON_REGISTER_CALLED, proxy.getData(), "Expecting proxy.getData() == ModelTestProxy.ON_REGISTER_CALLED");
                    // Remove the component
                    model.removeProxy(test.ModelTestProxy.NAME);
                    // assert that onRemove was called, and the proxy responded by setting its data accordingly
                    YUITest.Assert.areEqual(test.ModelTestProxy.ON_REMOVE_CALLED, proxy.getData(), "Expecting proxy.getData() == ModelTestProxy.ON_REMOVE_CALLED");
                };
                return ModelTest;
            }());
            test.ModelTest = ModelTest;
        })(test || (test = {}));
        ///<reference path='../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A Mediator class used by ViewTest.
             */
            var ViewTestMediator = /** @class */ (function (_super) {
                __extends(ViewTestMediator, _super);
                /**
                 * Constructs a <code>Mediator</code> subclass instance.
                 *
                 * @param view
                 *		The view component handled by this <code>Mediator</code>.
                 */
                function ViewTestMediator(view) {
                    return _super.call(this, ViewTestMediator.NAME, view) || this;
                }
                /**
                 * @override
                 *
                 * @return
                 * 		The list of notifications names in which is interested the <code>Mediator</code>.
                 */
                ViewTestMediator.prototype.listNotificationInterests = function () {
                    // Be sure that the mediator has some Observers created in order to test removeMediator.
                    return ['ABC', 'DEF', 'GHI'];
                };
                /**
                 * The Mediator name.
                 *
                 * @constant
                 */
                ViewTestMediator.NAME = "ViewTestMediator";
                return ViewTestMediator;
            }(puremvc.Mediator));
            test.ViewTestMediator = ViewTestMediator;
        })(test || (test = {}));
        ///<reference path='../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='ViewTest.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A Mediator class used by ViewTest.
             */
            var ViewTestMediator2 = /** @class */ (function (_super) {
                __extends(ViewTestMediator2, _super);
                /**
                 * Constructs a <code>Mediator</code> subclass instance.
                 *
                 * @param view
                 * 		The view component handled by this <code>Mediator</code>.
                 */
                function ViewTestMediator2(view) {
                    return _super.call(this, ViewTestMediator2.NAME, view) || this;
                }
                /**
                 * Standard getter to return the view handled by the <code>Mediator</code>.
                 *
                 * @return
                 * 		The view handled by the <code>Mediator</code>.
                 */
                ViewTestMediator2.prototype.getViewTest = function () {
                    return this.viewComponent;
                };
                /**
                 * @override
                 *
                 * @return
                 * 		The list of notifications names in which is interested the <code>Mediator</code>.
                 */
                ViewTestMediator2.prototype.listNotificationInterests = function () {
                    // be sure that the mediator has some Observers created
                    // in order to test removeMediator
                    return [test.ViewTest.NOTE1, test.ViewTest.NOTE2];
                };
                /**
                 * @override
                 *
                 * @param notification
                 * 		The notification instance to be handled.
                 */
                ViewTestMediator2.prototype.handleNotification = function (notification) {
                    this.getViewTest().lastNotification = notification.getName();
                };
                /**
                 * The Mediator name.
                 *
                 * @constant
                 */
                ViewTestMediator2.NAME = 'ViewTestMediator2';
                return ViewTestMediator2;
            }(puremvc.Mediator));
            test.ViewTestMediator2 = ViewTestMediator2;
        })(test || (test = {}));
        ///<reference path='../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='ViewTest.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A Mediator class used by ViewTest.
             */
            var ViewTestMediator3 = /** @class */ (function (_super) {
                __extends(ViewTestMediator3, _super);
                /**
                 * Constructs a <code>Mediator</code> subclass instance.
                 *
                 * @param view
                 * 		The view component handled by this <code>Mediator</code>.
                 */
                function ViewTestMediator3(view) {
                    return _super.call(this, ViewTestMediator3.NAME, view) || this;
                }
                /**
                 * Standard getter to return the view handled by the <code>Mediator</code>.
                 *
                 * @return
                 * 		The view handled by the <code>Mediator</code>.
                 */
                ViewTestMediator3.prototype.getViewTest = function () {
                    return this.viewComponent;
                };
                /**
                 * @override
                 *
                 * @return
                 * 		The list of notifications names in which is interested the <code>Mediator</code>.
                 */
                ViewTestMediator3.prototype.listNotificationInterests = function () {
                    // Be sure that the mediator has some Observers created in order to test removeMediator.
                    return [test.ViewTest.NOTE3];
                };
                /**
                 * @override
                 *
                 * @param notification
                 * 		The notification instance to be handled.
                 */
                ViewTestMediator3.prototype.handleNotification = function (notification) {
                    this.getViewTest().lastNotification = notification.getName();
                };
                /**
                 * The Mediator name.
                 *
                 * @constant
                 */
                ViewTestMediator3.NAME = 'ViewTestMediator3';
                return ViewTestMediator3;
            }(puremvc.Mediator));
            test.ViewTestMediator3 = ViewTestMediator3;
        })(test || (test = {}));
        ///<reference path='../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='ViewTest.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A Mediator class used by ViewTest.
             */
            var ViewTestMediator4 = /** @class */ (function (_super) {
                __extends(ViewTestMediator4, _super);
                /**
                 * Constructs a <code>Mediator</code> subclass instance.
                 *
                 * @param view
                 *		The view component handled by this <code>Mediator</code>.
                 */
                function ViewTestMediator4(view) {
                    return _super.call(this, ViewTestMediator4.NAME, view) || this;
                }
                /**
                 * Standard getter to return the view handled by the <code>Mediator</code>.
                 *
                 * @return
                 * 		The view handled by the <code>Mediator</code>.
                 */
                ViewTestMediator4.prototype.getViewTest = function () {
                    return this.viewComponent;
                };
                /**
                 * @override
                 */
                ViewTestMediator4.prototype.onRegister = function () {
                    this.getViewTest().onRegisterCalled = true;
                };
                /**
                 * @override
                 */
                ViewTestMediator4.prototype.onRemove = function () {
                    this.getViewTest().onRemoveCalled = true;
                };
                /**
                 * The Mediator name.
                 *
                 * @constant
                 */
                ViewTestMediator4.NAME = 'ViewTestMediator4';
                return ViewTestMediator4;
            }(puremvc.Mediator));
            test.ViewTestMediator4 = ViewTestMediator4;
        })(test || (test = {}));
        ///<reference path='../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='ViewTest.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A Mediator class used by ViewTest.
             */
            var ViewTestMediator5 = /** @class */ (function (_super) {
                __extends(ViewTestMediator5, _super);
                /**
                 * Constructs a <code>Mediator</code> subclass instance.
                 *
                 * @param view
                 * 		The view component handled by this <code>Mediator</code>.
                 */
                function ViewTestMediator5(view) {
                    return _super.call(this, ViewTestMediator5.NAME, view) || this;
                }
                /**
                 * Standard getter to return the view handled by the <code>Mediator</code>.
                 *
                 * @return
                 * 		The view handled by the <code>Mediator</code>.
                 */
                ViewTestMediator5.prototype.getViewTest = function () {
                    return this.viewComponent;
                };
                /**
                 * @override
                 *
                 * @return
                 * 		The list of notifications names in which is interested the <code>Mediator</code>.
                 */
                ViewTestMediator5.prototype.listNotificationInterests = function () {
                    return [test.ViewTest.NOTE5];
                };
                /**
                 * @override
                 *
                 * @param notification
                 * 		The notification instance to be handled.
                 */
                ViewTestMediator5.prototype.handleNotification = function (notification) {
                    this.getViewTest().counter++;
                };
                /**
                 * The Mediator name.
                 *
                 * @constant
                 */
                ViewTestMediator5.NAME = 'ViewTestMediator5';
                return ViewTestMediator5;
            }(puremvc.Mediator));
            test.ViewTestMediator5 = ViewTestMediator5;
        })(test || (test = {}));
        ///<reference path='../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='ViewTest.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A Mediator class used by ViewTest.
             */
            var ViewTestMediator6 = /** @class */ (function (_super) {
                __extends(ViewTestMediator6, _super);
                /**
                 * Constructs a <code>Mediator</code> subclass instance.
                 *
                 * @param mediatorName
                 * 		The name of the <code>Mediator</code>.
                 *
                 * @param view
                 * 		The view component handled by this <code>Mediator</code>.
                 */
                function ViewTestMediator6(mediatorName, view) {
                    return _super.call(this, mediatorName, view) || this;
                }
                /**
                 * Standard getter to return the view handled by the <code>Mediator</code>.
                 *
                 * @return
                 * 		The view handled by the <code>Mediator</code>.
                 */
                ViewTestMediator6.prototype.getViewTest = function () {
                    return this.viewComponent;
                };
                /**
                 * @override
                 *
                 * @return
                 * 		The list of notifications names in which is interested the
                 * 		<code>Mediator</code>.
                 */
                ViewTestMediator6.prototype.listNotificationInterests = function () {
                    return [test.ViewTest.NOTE6];
                };
                /**
                 * @override
                 *
                 * @param notification
                 * 		The notification instance to be handled.
                 */
                ViewTestMediator6.prototype.handleNotification = function (notification) {
                    this.facade.removeMediator(this.getMediatorName());
                };
                /**
                 * @override
                 */
                ViewTestMediator6.prototype.onRemove = function () {
                    this.getViewTest().counter++;
                };
                /**
                 * The Mediator name.
                 *
                 * @constant
                 */
                ViewTestMediator6.NAME = 'ViewTestMediator6';
                return ViewTestMediator6;
            }(puremvc.Mediator));
            test.ViewTestMediator6 = ViewTestMediator6;
        })(test || (test = {}));
        ///<reference path='../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A <code>INotification</code> implementor used by <code>ViewTest</code>.
             */
            var ViewTestNote = /** @class */ (function (_super) {
                __extends(ViewTestNote, _super);
                /**
                 * Constructs a <code>Notification</code> subclass instance.
                 *
                 * @param name
                 *		Ignored and forced to NAME.
                 *
                 * @param body
                 *		The body of the Notification to be constructed.
                 */
                function ViewTestNote(name, body) {
                    return _super.call(this, ViewTestNote.NAME, body) || this;
                }
                /**
                 * Factory method.
                 *
                 * This method creates new instances of the ViewTestNote class,
                 * automatically setting the notification name so you don't have to. Use
                 * this as an alternative to the constructor.
                 *
                 * @param body
                 * 		The body of the Notification to be constructed.
                 *
                 * @return
                 *		The created <code>Notification</code>
                 */
                ViewTestNote.create = function (body) {
                    return new ViewTestNote(ViewTestNote.NAME, body);
                };
                /**
                 * The name of this Notification.
                 */
                ViewTestNote.NAME = "ViewTestNote";
                return ViewTestNote;
            }(puremvc.Notification));
            test.ViewTestNote = ViewTestNote;
        })(test || (test = {}));
        ///<reference path='../../../../../../test/lib/YUITest.d.ts'/>
        ///<reference path='../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='ViewTestMediator.ts'/>
        ///<reference path='ViewTestMediator2.ts'/>
        ///<reference path='ViewTestMediator3.ts'/>
        ///<reference path='ViewTestMediator4.ts'/>
        ///<reference path='ViewTestMediator5.ts'/>
        ///<reference path='ViewTestMediator6.ts'/>
        ///<reference path='ViewTestNote.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * Test the PureMVC View class.
             */
            var ViewTest = /** @class */ (function () {
                function ViewTest() {
                    /**
                     * The name of the test case - if not provided, one is automatically generated by the
                     * YUITest framework.
                     */
                    this.name = "PureMVC View class tests";
                    /**
                     * Store the last notification name called.
                     */
                    this.lastNotification = "";
                    /**
                     * Used by some commands to increment calls number.
                     */
                    this.counter = 0;
                    /**
                     * Used by some commands to mark the onRegister method as called.
                     */
                    this.onRegisterCalled = false;
                    /**
                     * Used by some commands to mark the onRemove method as called.
                     */
                    this.onRemoveCalled = false;
                    /**
                     * A test variable that proves the viewTestMethod was invoked by the View.
                     */
                    this.viewTestVar = 0;
                }
                /**
                 * Tests the View singleton Factory Method
                 */
                ViewTest.prototype.testGetInstance = function () {
                    // Test Factory Method
                    var view = puremvc.View.getInstance();
                    // test assertions
                    YUITest.Assert.isNotNull(view, "Expecting instance !== null");
                    YUITest.Assert.isInstanceOf(puremvc.View, view, "Expecting instance implements View");
                };
                /**
                 * Tests registration and notification of Observers.
                 *
                 * An Observer is created to callback the viewTestMethod of
                 * this ViewTest instance. This Observer is registered with
                 * the View to be notified of 'ViewTestEvent' events. Such
                 * an event is created, and a value set on its payload. Then
                 * the View is told to notify interested observers of this
                 * Event.
                 *
                 * The View calls the Observer's notifyObserver method
                 * which calls the viewTestMethod on this instance
                 * of the ViewTest class. The viewTestMethod method will set
                 * an instance variable to the value passed in on the Event
                 * payload. We evaluate the instance variable to be sure
                 * it is the same as that passed out as the payload of the
                 * original 'ViewTestEvent'.
                 *
                 */
                ViewTest.prototype.testRegisterAndNotifyObserver = function () {
                    // Get the singleton View instance
                    var view = puremvc.View.getInstance();
                    // Create observer, passing in notification method and context
                    var observer = new puremvc.Observer(this.viewTestMethod, this);
                    // Register Observer's interest in a particular Notification with the View
                    view.registerObserver(test.ViewTestNote.NAME, observer);
                    // Create a ViewTestNote, setting
                    // a body value, and tell the View to notify
                    // Observers. Since the Observer is this class
                    // and the notification method is viewTestMethod,
                    // successful notification will result in our local
                    // viewTestVar being set to the value we pass in
                    // on the notification body.
                    var notification = test.ViewTestNote.create(10);
                    view.notifyObservers(notification);
                    // test assertions
                    YUITest.Assert.areEqual(10, this.viewTestVar, "Expecting viewTestVar = 10");
                };
                /**
                 * A utility method to test the notification of Observers by the view.
                 *
                 * @param notification
                 *		The notification to test.
                 */
                ViewTest.prototype.viewTestMethod = function (notification) {
                    // set the local viewTestVar to the number on the event payload
                    this.viewTestVar = notification.getBody();
                };
                /**
                 * Tests registering and retrieving a mediator with
                 * the View.
                 */
                ViewTest.prototype.testRegisterAndRetrieveMediator = function () {
                    // Get the singleton View instance
                    var view = puremvc.View.getInstance();
                    // Create and register the test mediator
                    var viewTestMediator = new test.ViewTestMediator(this);
                    view.registerMediator(viewTestMediator);
                    // Retrieve the component
                    var mediator = view.retrieveMediator(test.ViewTestMediator.NAME);
                    // test assertions
                    YUITest.Assert.isInstanceOf(test.ViewTestMediator, mediator, "Expecting comp is ViewTestMediator");
                };
                /**
                 * Tests the hasMediator Method
                 */
                ViewTest.prototype.testHasMediator = function () {
                    // register a Mediator
                    var view = puremvc.View.getInstance();
                    // Create and register the test mediator
                    var mediator = new puremvc.Mediator('hasMediatorTest', this);
                    view.registerMediator(mediator);
                    // assert that the view.hasMediator method returns true
                    // for that mediator name
                    YUITest.Assert.isTrue(view.hasMediator('hasMediatorTest'), "Expecting view.hasMediator('hasMediatorTest') === true");
                    view.removeMediator('hasMediatorTest');
                    // assert that the view.hasMediator method returns false
                    // for that mediator name
                    YUITest.Assert.isFalse(view.hasMediator('hasMediatorTest'), "Expecting view.hasMediator('hasMediatorTest') === false");
                };
                /**
                 * Tests registering and removing a mediator
                 */
                ViewTest.prototype.testRegisterAndRemoveMediator = function () {
                    // Get the singleton View instance
                    var view = puremvc.View.getInstance();
                    // Create and register the test mediator
                    var mediator = new puremvc.Mediator('testing', this);
                    view.registerMediator(mediator);
                    // Remove the component
                    var removedMediator = view.removeMediator('testing');
                    // assert that we have removed the appropriate mediator
                    YUITest.Assert.areEqual('testing', removedMediator.getMediatorName(), "Expecting removedMediator.getMediatorName() == 'testing'");
                    var retrievedMediator = view.retrieveMediator('testing');
                    // assert that the mediator is no longer retrievable
                    YUITest.Assert.isNull(retrievedMediator, "Expecting view.retrieveMediator( 'testing' ) === null )");
                };
                /**
                 * Tests that the View callse the onRegister and onRemove methods
                 */
                ViewTest.prototype.testOnRegisterAndOnRemove = function () {
                    // Get the singleton View instance
                    var view = puremvc.View.getInstance();
                    // Create and register the test mediator
                    var mediator = new test.ViewTestMediator4(this);
                    view.registerMediator(mediator);
                    // assert that onRegsiter was called, and the mediator responded by setting our boolean
                    YUITest.Assert.isTrue(this.onRegisterCalled, "Expecting onRegisterCalled === true");
                    // Remove the component
                    view.removeMediator(test.ViewTestMediator4.NAME);
                    // assert that the mediator is no longer retrievable
                    YUITest.Assert.isTrue(this.onRemoveCalled, "Expecting onRemoveCalled === true");
                };
                /**
                 * Tests successive regster and remove of same mediator.
                 */
                ViewTest.prototype.testSuccessiveRegisterAndRemoveMediator = function () {
                    // Get the singleton View instance
                    var view = puremvc.View.getInstance();
                    // Create and register the test mediator,
                    // but not so we have a reference to it
                    view.registerMediator(new test.ViewTestMediator(this));
                    // test that we can retrieve it
                    YUITest.Assert.isInstanceOf(test.ViewTestMediator, view.retrieveMediator(test.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) isInstanceOf ViewTestMediator");
                    // Remove the Mediator
                    view.removeMediator(test.ViewTestMediator.NAME);
                    // test that retrieving it now returns null
                    YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) === null");
                    // test that removing the mediator again once its gone return null
                    YUITest.Assert.isNull(view.removeMediator(test.ViewTestMediator.NAME), "Expecting view.removeMediator( ViewTestMediator.NAME ) === null");
                    // Create and register another instance of the test mediator,
                    view.registerMediator(new test.ViewTestMediator(this));
                    YUITest.Assert.isInstanceOf(test.ViewTestMediator, view.retrieveMediator(test.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) is ViewTestMediator");
                    // Remove the Mediator
                    view.removeMediator(test.ViewTestMediator.NAME);
                    // test that retrieving it now returns null
                    YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator.NAME), "Expecting view.retrieveMediator( ViewTestMediator.NAME ) === null");
                };
                /**
                 * Tests registering a Mediator for 2 different notifications, removing the
                 * Mediator from the View, and seeing that neither notification causes the
                 * Mediator to be notified. Added for the fix deployed in version 1.7
                 */
                ViewTest.prototype.testRemoveMediatorAndSubsequentNotify = function () {
                    // Get the singleton View instance
                    var view = puremvc.View.getInstance();
                    // Create and register the test mediator to be removed.
                    view.registerMediator(new test.ViewTestMediator2(this));
                    // test that notifications work
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
                    YUITest.Assert.areEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification == NOTE1");
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
                    YUITest.Assert.areEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification == NOTE2");
                    // Remove the Mediator
                    view.removeMediator(test.ViewTestMediator2.NAME);
                    // test that retrieving it now returns null
                    YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator2.NAME), "Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null");
                    // test that notifications no longer work
                    // (ViewTestMediator2 is the one that sets lastNotification
                    // on this component, and ViewTestMediator)
                    this.lastNotification = null;
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
                    YUITest.Assert.areNotEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification != NOTE1");
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
                    YUITest.Assert.areNotEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification != NOTE2");
                };
                /**
                 * Tests registering one of two registered Mediators and seeing
                 * that the remaining one still responds.
                 * Added for the fix deployed in version 1.7.1
                 */
                ViewTest.prototype.testRemoveOneOfTwoMediatorsAndSubsequentNotify = function () {
                    // Get the singleton View instance
                    var view = puremvc.View.getInstance();
                    // Create and register that responds to notifications 1 and 2
                    view.registerMediator(new test.ViewTestMediator2(this));
                    // Create and register that responds to notification 3
                    view.registerMediator(new test.ViewTestMediator3(this));
                    // test that all notifications work
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
                    YUITest.Assert.areEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification == NOTE1");
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
                    YUITest.Assert.areEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification == NOTE2");
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE3));
                    YUITest.Assert.areEqual(ViewTest.NOTE3, this.lastNotification, "Expecting lastNotification == NOTE3");
                    // Remove the Mediator that responds to 1 and 2
                    view.removeMediator(test.ViewTestMediator2.NAME);
                    // test that retrieving it now returns null
                    YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator2.NAME), "Expecting view.retrieveMediator( ViewTestMediator2.NAME ) === null");
                    // test that notifications no longer work
                    // for notifications 1 and 2, but still work for 3
                    this.lastNotification = null;
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE1));
                    YUITest.Assert.areNotEqual(ViewTest.NOTE1, this.lastNotification, "Expecting lastNotification != NOTE1");
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE2));
                    YUITest.Assert.areNotEqual(ViewTest.NOTE2, this.lastNotification, "Expecting lastNotification != NOTE2");
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE3));
                    YUITest.Assert.areEqual(ViewTest.NOTE3, this.lastNotification, "Expecting lastNotification == NOTE3");
                };
                /**
                 * Tests registering the same mediator twice.
                 * A subsequent notification should only illicit
                 * one response. Also, since reregistration
                 * was causing 2 observers to be created, ensure
                 * that after removal of the mediator there will
                 * be no further response.
                 *
                 * Added for the fix deployed in version 2.0.4
                 */
                ViewTest.prototype.testMediatorReregistration = function () {
                    // Get the singleton View instance
                    var view = puremvc.View.getInstance();
                    // Create and register that responds to notification 5
                    view.registerMediator(new test.ViewTestMediator5(this));
                    // try to register another instance of that mediator (uses the same NAME constant).
                    view.registerMediator(new test.ViewTestMediator5(this));
                    // test that the counter is only incremented once (mediator 5's response)
                    this.counter = 0;
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE5));
                    YUITest.Assert.areEqual(1, this.counter, "Expecting counter == 1");
                    // Remove the Mediator
                    view.removeMediator(test.ViewTestMediator5.NAME);
                    // test that retrieving it now returns null
                    YUITest.Assert.isNull(view.retrieveMediator(test.ViewTestMediator5.NAME), "Expecting view.retrieveMediator( ViewTestMediator5.NAME ) === null");
                    // test that the counter is no longer incremented
                    this.counter = 0;
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE5));
                    YUITest.Assert.areEqual(0, this.counter, "Expecting counter == 0");
                };
                /**
                 * Tests the ability for the observer list to
                 * be modified during the process of notification,
                 * and all observers be properly notified. This
                 * happens most often when multiple Mediators
                 * respond to the same notification by removing
                 * themselves.
                 *
                 * Added for the fix deployed in version 2.0.4
                 */
                ViewTest.prototype.testModifyObserverListDuringNotification = function () {
                    // Get the singleton View instance
                    var view = puremvc.View.getInstance();
                    // Create and register several mediator instances that respond to notification 6
                    // by removing themselves, which will cause the observer list for that notification
                    // to change.
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/1", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/2", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/3", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/4", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/5", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/6", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/7", this));
                    view.registerMediator(new test.ViewTestMediator6(test.ViewTestMediator6.NAME + "/8", this));
                    // clear the counter
                    this.counter = 0;
                    // send the notification. each of the above mediators will respond by removing
                    // themselves and incrementing the counter by 1. This should leave us with a
                    // count of 8, since 8 mediators will respond.
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE6));
                    // verify the count is correct
                    YUITest.Assert.areEqual(8, this.counter, "Expecting counter == 8");
                    // clear the counter
                    this.counter = 0;
                    view.notifyObservers(new puremvc.Notification(ViewTest.NOTE6));
                    // verify the count is 0
                    YUITest.Assert.areEqual(0, this.counter, "Expecting counter == 0");
                };
                /**
                 * @constant
                 */
                ViewTest.NOTE1 = "Notification1";
                /**
                 * @constant
                 */
                ViewTest.NOTE2 = "Notification2";
                /**
                 * @constant
                 */
                ViewTest.NOTE3 = "Notification3";
                /**
                 * @constant
                 */
                ViewTest.NOTE4 = "Notification4";
                /**
                 * @constant
                 */
                ViewTest.NOTE5 = "Notification5";
                /**
                 * @constant
                 */
                ViewTest.NOTE6 = "Notification6";
                return ViewTest;
            }());
            test.ViewTest = ViewTest;
        })(test || (test = {}));
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A <code>MacroCommand</code> utility subclass used by <code>MacroCommandTest</code>.
             */
            var MacroCommandTestSub = /** @class */ (function (_super) {
                __extends(MacroCommandTestSub, _super);
                function MacroCommandTestSub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * A method to test if <code>Facade</code> instance of the object has
                 * well been declared during its construction.
                 *
                 * @return
                 * 		<code>Facade</code> instance of the object has well been declared
                 * 		during its construction.
                 */
                MacroCommandTestSub.prototype.hasFacade = function () {
                    return this.facade instanceof puremvc.Facade;
                };
                return MacroCommandTestSub;
            }(puremvc.MacroCommand));
            test.MacroCommandTestSub = MacroCommandTestSub;
        })(test || (test = {}));
        var test;
        (function (test) {
            "use strict";
            /**
             * A utility class used by MacroCommandTest.
             */
            var MacroCommandTestVO = /** @class */ (function () {
                /**
                 * Constructs a <code>MacroCommandTestVO</code> instance.
                 *
                 * @param input
                 *		A random number to pass to the command.
                 */
                function MacroCommandTestVO(input) {
                    /**
                     * Will be used to store the number to pass to the command.
                     */
                    this.input = null;
                    /**
                     * Will be used to read the result calculated by the command.
                     */
                    this.result1 = null;
                    /**
                     * Will be used to read the result calculated by the command.
                     */
                    this.result2 = null;
                    this.input = input;
                }
                return MacroCommandTestVO;
            }());
            test.MacroCommandTestVO = MacroCommandTestVO;
        })(test || (test = {}));
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='MacroCommandTestVO.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A <code>SimpleCommand</code> subclass used by <code>MacroCommandTestCommand</code>.
             */
            var MacroCommandTestSub1Command = /** @class */ (function (_super) {
                __extends(MacroCommandTestSub1Command, _super);
                function MacroCommandTestSub1Command() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * Fabricate a result by multiplying the input by 2.
                 *
                 * @param notification
                 * 		The <code>Notification</code> carrying the <code>MacroCommandTestVO</code>.
                 */
                MacroCommandTestSub1Command.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    // Fabricate a result
                    vo.result1 = 2 * vo.input;
                };
                return MacroCommandTestSub1Command;
            }(puremvc.SimpleCommand));
            test.MacroCommandTestSub1Command = MacroCommandTestSub1Command;
        })(test || (test = {}));
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='MacroCommandTestVO.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A <code>SimpleCommand</code> subclass used by <code>MacroCommandTestCommand</code>.
             */
            var MacroCommandTestSub2Command = /** @class */ (function (_super) {
                __extends(MacroCommandTestSub2Command, _super);
                function MacroCommandTestSub2Command() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * Fabricate a result by multiplying the input by 2
                 *
                 * @param notification
                 * 		The <code>Notification</code> carrying the <code>MacroCommandTestVO</code>.
                 */
                MacroCommandTestSub2Command.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    // Fabricate a result
                    vo.result2 = vo.input * vo.input;
                };
                return MacroCommandTestSub2Command;
            }(puremvc.SimpleCommand));
            test.MacroCommandTestSub2Command = MacroCommandTestSub2Command;
        })(test || (test = {}));
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='MacroCommandTestSub1Command.ts'/>
        ///<reference path='MacroCommandTestSub2Command.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A MacroCommand subclass used by MacroCommandTest.
             */
            var MacroCommandTestCommand = /** @class */ (function (_super) {
                __extends(MacroCommandTestCommand, _super);
                function MacroCommandTestCommand() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * Initialize the MacroCommandTestCommand by adding
                 * its 2 SubCommands.
                 *
                 * @override
                 */
                MacroCommandTestCommand.prototype.initializeMacroCommand = function () {
                    this.addSubCommand(test.MacroCommandTestSub1Command);
                    this.addSubCommand(test.MacroCommandTestSub2Command);
                };
                return MacroCommandTestCommand;
            }(puremvc.MacroCommand));
            test.MacroCommandTestCommand = MacroCommandTestCommand;
        })(test || (test = {}));
        ///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='MacroCommandTestSub.ts'/>
        ///<reference path='MacroCommandTestCommand.ts'/>
        ///<reference path='MacroCommandTestVO.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * Test the PureMVC MacroCommmand class.
             */
            var MacroCommandTest = /** @class */ (function () {
                function MacroCommandTest() {
                    /**
                     * The name of the test case - if not provided, one is automatically generated by the
                     * YUITest framework.
                     */
                    this.name = "PureMVC MacroCommmand class tests";
                }
                /**
                 * Tests if constructing the <code>MacroCommand</code> also call its super by testing for
                 * the existence of its <code>Notifier</code> superclass facade instance.
                 */
                MacroCommandTest.prototype.testConstructor = function () {
                    // Create a new subclass of Notifier and verify that its facade has well been created
                    var macroCommandTestSub = new test.MacroCommandTestSub();
                    // test assertions
                    YUITest.Assert.isTrue(macroCommandTestSub.hasFacade(), "Expecting macroCommandTestSub.hasFacade() === true");
                };
                /**
                 * Tests operation of a <code>MacroCommand</code>.
                 *
                 * This test creates a new <code>Notification</code>, adding a
                 * <code>MacroCommandTestVO</code> as the body. It then creates a
                 * <code>MacroCommandTestCommand</code> and invokes its <code>execute</code> method, passing
                 * in the <code>Notification</code>.
                 *
                 * The <code>MacroCommandTestCommand</code> has defined an <code>initMacroCommand</code>
                 * method, which is called automatically by its constructor. In this method the
                 * <code>MacroCommandTestCommand</code> adds 2 SubCommands to itself,
                 * <code>MacroCommandTestSub1Command</code> and <code>MacroCommandTestSub2Command</code>.
                 *
                 * The <code>MacroCommandTestVO</code> has 2 result properties, one is set by
                 * <code>MacroCommandTestSub1Command</code> by multiplying the input property by 2, and the
                 * other is set by <code>MacroCommandTestSub2Command</code> by multiplying the input
                 * property by itself.
                 *
                 * Success is determined by evaluating the 2 result properties on the
                 * <code>MacroCommandTestVO</code> that was passed to the
                 * <code>MacroCommandTestCommand</code> on the Notification body.
                 *
                 */
                MacroCommandTest.prototype.testMacroCommandExecute = function () {
                    // Create the VO
                    var vo = new test.MacroCommandTestVO(5);
                    // Create the Notification (notification)
                    var notification = new puremvc.Notification('MacroCommandTest', vo);
                    // Create the MacroCommand
                    var command = new test.MacroCommandTestCommand();
                    // Execute the MacroCommand
                    command.execute(notification);
                    // test assertions
                    YUITest.Assert.areEqual(10, vo.result1, "Expecting vo.result1 == 10");
                    YUITest.Assert.areEqual(25, vo.result2, "Expecting vo.result2 == 25");
                };
                return MacroCommandTest;
            }());
            test.MacroCommandTest = MacroCommandTest;
        })(test || (test = {}));
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A utility class used by SimpleCommandTest.
             */
            var SimpleCommandTestVO = /** @class */ (function () {
                /**
                 * Constructs a <code>SimpleCommandTestVO</code> instance.
                 *
                 * @param input
                 * 		The number to be fed to the	<code>SimpleCommandTestCommand</code>.
                 */
                function SimpleCommandTestVO(input) {
                    /**
                     * Will be used to store the number to pass to the command.
                     */
                    this.input = null;
                    /**
                     * Will be used to read the result calculated by the command.
                     */
                    this.result = null;
                    this.input = input;
                }
                return SimpleCommandTestVO;
            }());
            test.SimpleCommandTestVO = SimpleCommandTestVO;
        })(test || (test = {}));
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='SimpleCommandTestVO.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A <code>SimpleCommand</code> subclass used by <code>SimpleCommandTest</code>.
             */
            var SimpleCommandTestCommand = /** @class */ (function (_super) {
                __extends(SimpleCommandTestCommand, _super);
                function SimpleCommandTestCommand() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * Fabricate a result by multiplying the input by 2.
                 *
                 * @param notification
                 * 		The <code>Notification</code> carrying the <code>SimpleCommandTestVO</code>.
                 */
                SimpleCommandTestCommand.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    // Fabricate a result
                    vo.result = 2 * vo.input;
                };
                return SimpleCommandTestCommand;
            }(puremvc.SimpleCommand));
            test.SimpleCommandTestCommand = SimpleCommandTestCommand;
        })(test || (test = {}));
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='SimpleCommandTestVO.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A <code>SimpleCommand</code> utility subclass used by <code>SimpleCommandTest</code>.
             */
            var SimpleCommandTestSub = /** @class */ (function (_super) {
                __extends(SimpleCommandTestSub, _super);
                function SimpleCommandTestSub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * A method to test if <code>Facade</code> instance of the object has well been declared
                 * during its construction.
                 *
                 * @return
                 * 		<code>Facade</code> instance of the object has well been declared during its
                 * 		construction.
                 */
                SimpleCommandTestSub.prototype.hasFacade = function () {
                    return this.facade instanceof puremvc.Facade;
                };
                return SimpleCommandTestSub;
            }(puremvc.SimpleCommand));
            test.SimpleCommandTestSub = SimpleCommandTestSub;
        })(test || (test = {}));
        ///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='SimpleCommandTestCommand.ts'/>
        ///<reference path='SimpleCommandTestVO.ts'/>
        ///<reference path='SimpleCommandTestSub.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * Test the PureMVC <code>SimpleCommand</code> class.
             */
            var SimpleCommandTest = /** @class */ (function () {
                function SimpleCommandTest() {
                    /**
                     * The name of the test case - if not provided, one is automatically generated by the
                     * YUITest framework.
                     */
                    this.name = "PureMVC SimpleCommand class Tests";
                }
                /**
                 * Tests if constructing the <code>SimpleCommand</code> also call its super by testing for
                 * the existence of its <code>Notifier</code> superclass facade instance.
                 */
                SimpleCommandTest.prototype.testConstructor = function () {
                    // Create a new subclass of Notifier and verify that its facade has well been created
                    var simpleCommandTestSub = new test.SimpleCommandTestSub();
                    // test assertions
                    YUITest.Assert.isTrue(simpleCommandTestSub.hasFacade(), "Expecting simpleCommandTestSub.hasFacade() === true");
                };
                /**
                 * Tests the <code>execute</code> method of a <code>SimpleCommand</code>.
                 *
                 * This test creates a new <code>Notification</code>, adding a
                 * <code>SimpleCommandTestVO</code> as the body. It then creates a
                 * <code>SimpleCommandTestCommand</code> and invokes its <code>execute</code> method,
                 * passing in the notification.
                 *
                 * Success is determined by evaluating a property on the object that was passed on the
                 * <code>Notification</code> body, which will be modified by the SimpleCommand.
                 */
                SimpleCommandTest.prototype.testSimpleCommandExecute = function () {
                    // Create the VO
                    var vo = new test.SimpleCommandTestVO(5);
                    // Create the Notification (notification)
                    var notification = new puremvc.Notification('SimpleCommandTestNote', vo);
                    // Create the SimpleCommand
                    var command = new test.SimpleCommandTestCommand();
                    // Execute the SimpleCommand
                    command.execute(notification);
                    // test assertions
                    YUITest.Assert.areEqual(10, vo.result, "Expecting vo.result == 10");
                };
                return SimpleCommandTest;
            }());
            test.SimpleCommandTest = SimpleCommandTest;
        })(test || (test = {}));
        var test;
        (function (test) {
            "use strict";
            /**
             * A utility class used by FacadeTest.
             */
            var FacadeTestVO = /** @class */ (function () {
                /**
                 * Constructs a <code>FacadeTestVo</code> instance.
                 *
                 * @param input
                 * 		The number to be fed to the FacadeTestCommand
                 */
                function FacadeTestVO(input) {
                    /**
                     * Will be used to store the number to pass to the command.
                     */
                    this.input = null;
                    /**
                     * Will be used to read the result calculated by the command.
                     */
                    this.result = null;
                    this.input = input;
                }
                return FacadeTestVO;
            }());
            test.FacadeTestVO = FacadeTestVO;
        })(test || (test = {}));
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='FacadeTestVO.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A <code>SimpleCommand</code> subclass used by FacadeTest.
             */
            var FacadeTestCommand = /** @class */ (function (_super) {
                __extends(FacadeTestCommand, _super);
                function FacadeTestCommand() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * Fabricate a result by multiplying the input by 2.
                 *
                 * @param notification
                 * 		The <code>Notification</code> carrying the FacadeTestVO.
                 */
                FacadeTestCommand.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    // Fabricate a result
                    vo.result = 2 * vo.input;
                };
                return FacadeTestCommand;
            }(puremvc.SimpleCommand));
            test.FacadeTestCommand = FacadeTestCommand;
        })(test || (test = {}));
        ///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='FacadeTestCommand.ts'/>
        ///<reference path='FacadeTestVO.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * Test the PureMVC Facade class.
             */
            var FacadeTest = /** @class */ (function () {
                function FacadeTest() {
                    /**
                     * The name of the test case - if not provided, one is automatically generated by the
                     * YUITest framework.
                     */
                    this.name = "PureMVC Facade class tests";
                }
                /**
                 * Tests the Facade singleton Factory Method
                 */
                FacadeTest.prototype.testGetInstance = function () {
                    // Test Factory Method
                    var facade = puremvc.Facade.getInstance();
                    // test assertions
                    YUITest.Assert.isNotUndefined(facade, "Expecting facade not to be undefined");
                    YUITest.Assert.isInstanceOf(puremvc.Facade, facade, "Expecting instance is instance of Facade");
                };
                /**
                 * Tests Command registration and execution via the Facade.
                 *
                 * This test gets the singleton Facade instance and registers the FacadeTestCommand class to
                 * handle 'FacadeTest' Notifications.
                 *
                 * It then sends a notification using the Facade. Success is determined by evaluating a
                 * property on an object placed in the body of the Notification, which will be modified by
                 * the Command.
                 */
                FacadeTest.prototype.testRegisterCommandAndSendNotification = function () {
                    /*
                     * Create the Facade, register the FacadeTestCommand to handle 'FacadeTest'
                     * notifications.
                     */
                    var facade = puremvc.Facade.getInstance();
                    facade.registerCommand('FacadeTestNote', test.FacadeTestCommand);
                    /*
                     * Send notification. The Command associated with the event (FacadeTestCommand) will be
                     * invoked, and will multiply the vo.input value by 2 and set the result on vo.result
                     */
                    var vo = new test.FacadeTestVO(32);
                    facade.sendNotification('FacadeTestNote', vo);
                    // test assertions
                    YUITest.Assert.areEqual(64, vo.result, "Expecting vo.result == 64");
                };
                /**
                 * Tests Command removal via the Facade.
                 *
                 * This test gets the singleton Facade instance and registers the FacadeTestCommand class to
                 * handle 'FacadeTest' Notifcations. Then it removes the command.
                 *
                 * It then sends a Notification using the Facade. Success is determined by evaluating a
                 * property on an object placed in the body of the Notification, which will NOT be modified
                 * by the Command.
                 */
                FacadeTest.prototype.testRegisterAndRemoveCommandAndSendNotification = function () {
                    // Create the Facade, register the FacadeTestCommand to handle 'FacadeTest' events.
                    var facade = puremvc.Facade.getInstance();
                    facade.registerCommand('FacadeTestNote', test.FacadeTestCommand);
                    facade.removeCommand('FacadeTestNote');
                    // Send notification. The Command associated with the event
                    // (FacadeTestCommand) will NOT be invoked, and will NOT multiply
                    // the vo.input value by 2
                    var vo = new test.FacadeTestVO(32);
                    facade.sendNotification('FacadeTestNote', vo);
                    // test assertions
                    YUITest.Assert.areNotEqual(64, vo.result, "Expecting vo.result != 64");
                };
                /**
                 * Tests the registering and retrieving Model proxies via the Facade.
                 *
                 * Tests <code>registerProxy</code> and <code>retrieveProxy</code> in the same test. These
                 * methods cannot currently be tested separately in any meaningful way other than to show
                 * that the methods do not throw exception when called.
                 */
                FacadeTest.prototype.testRegisterAndRetrieveProxy = function () {
                    // Register a proxy and retrieve it.
                    var facade = puremvc.Facade.getInstance();
                    facade.registerProxy(new puremvc.Proxy('colors', ['red', 'green', 'blue']));
                    var proxy = facade.retrieveProxy('colors');
                    YUITest.Assert.isInstanceOf(puremvc.Proxy, proxy, "Expecting proxy is Proxy");
                    // retrieve data from proxy
                    var data = proxy.getData();
                    // test assertions
                    YUITest.Assert.isNotUndefined(data, "Expecting data not null");
                    YUITest.Assert.isArray(data, "Expecting data is Array");
                    YUITest.Assert.areEqual(3, data.length, "Expecting data.length == 3");
                    YUITest.Assert.areEqual('red', data[0], "Expecting data[0] == 'red'");
                    YUITest.Assert.areEqual('green', data[1], "Expecting data[1] == 'green'");
                    YUITest.Assert.areEqual('blue', data[2], "Expecting data[2] == 'blue'");
                };
                /**
                 * Tests the removing Proxies via the Facade.
                 */
                FacadeTest.prototype.testRegisterAndRemoveProxy = function () {
                    // register a proxy, remove it, then try to retrieve it
                    var facade = puremvc.Facade.getInstance();
                    var proxy = new puremvc.Proxy('sizes', ['7', '13', '21']);
                    facade.registerProxy(proxy);
                    // remove the proxy
                    var removedProxy = facade.removeProxy('sizes');
                    // test assertions
                    // assert that we removed the appropriate proxy
                    YUITest.Assert.areEqual('sizes', removedProxy ? removedProxy.getProxyName() : null, "Expecting removedProxy.getProxyName() == 'sizes'");
                    // make sure we can no longer retrieve the proxy from the model
                    proxy = facade.retrieveProxy('sizes');
                    // assert that the proxy is no longer retrievable
                    YUITest.Assert.isNull(proxy, "Expecting proxy === null");
                };
                /**
                 * Tests registering, retrieving and removing Mediators via the Facade.
                 */
                FacadeTest.prototype.testRegisterRetrieveAndRemoveMediator = function () {
                    // register a mediator, remove it, then try to retrieve it
                    var facade = puremvc.Facade.getInstance();
                    facade.registerMediator(new puremvc.Mediator(puremvc.Mediator.NAME, new Object()));
                    // retrieve the mediator
                    YUITest.Assert.isNotNull(facade.retrieveMediator(puremvc.Mediator.NAME), "Expecting facade.retrieveMediator( puremvc.Mediator.NAME ) !== null");
                    // remove the mediator
                    var removedMediator = facade.removeMediator(puremvc.Mediator.NAME);
                    // assert that we have removed the appropriate mediator
                    YUITest.Assert.areEqual(puremvc.Mediator.NAME, removedMediator ? removedMediator.getMediatorName() : null, "Expecting removedMediator.getMediatorName() == Mediator.NAME");
                    // assert that the mediator is no longer retrievable
                    YUITest.Assert.isNull(facade.retrieveMediator(puremvc.Mediator.NAME), "Expecting facade.retrieveMediator( Mediator.NAME ) === null )");
                };
                /**
                 * Tests the hasProxy Method
                 */
                FacadeTest.prototype.testHasProxy = function () {
                    // register a Proxy
                    var facade = puremvc.Facade.getInstance();
                    facade.registerProxy(new puremvc.Proxy('hasProxyTest', [1, 2, 3]));
                    // assert that the model.hasProxy method returns true
                    // for that proxy name
                    YUITest.Assert.isTrue(facade.hasProxy('hasProxyTest'), "Expecting facade.hasProxy('hasProxyTest') === true");
                };
                /**
                 * Tests the hasMediator Method
                 */
                FacadeTest.prototype.testHasMediator = function () {
                    // register a Mediator
                    var facade = puremvc.Facade.getInstance();
                    facade.registerMediator(new puremvc.Mediator('facadeHasMediatorTest', new Object()));
                    // assert that the facade.hasMediator method returns true
                    // for that mediator name
                    YUITest.Assert.isTrue(facade.hasMediator('facadeHasMediatorTest'), "Expecting facade.hasMediator('facadeHasMediatorTest') === true");
                    facade.removeMediator('facadeHasMediatorTest');
                    // assert that the facade.hasMediator method returns false
                    // for that mediator name
                    YUITest.Assert.isFalse(facade.hasMediator('facadeHasMediatorTest'), "Expecting facade.hasMediator('facadeHasMediatorTest') === false");
                };
                /**
                 * Test hasCommand method.
                 */
                FacadeTest.prototype.testHasCommand = function () {
                    // register the ControllerTestCommand to handle 'hasCommandTest' notifications
                    var facade = puremvc.Facade.getInstance();
                    facade.registerCommand('facadeHasCommandTest', test.FacadeTestCommand);
                    // test that hasCommand returns true for hasCommandTest notifications
                    YUITest.Assert.isTrue(facade.hasCommand('facadeHasCommandTest'), "Expecting facade.hasCommand('facadeHasCommandTest') === true");
                    // Remove the Command from the Controller
                    facade.removeCommand('facadeHasCommandTest');
                    // test that hasCommand returns false for hasCommandTest notifications
                    YUITest.Assert.isFalse(facade.hasCommand('facadeHasCommandTest'), "Expecting facade.hasCommand('facadeHasCommandTest') === false");
                };
                return FacadeTest;
            }());
            test.FacadeTest = FacadeTest;
        })(test || (test = {}));
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A <code>Mediator</code> utility subclass used by <code>MediatorTest</code>.
             */
            var MediatorTestSub = /** @class */ (function (_super) {
                __extends(MediatorTestSub, _super);
                function MediatorTestSub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * A method to test if <code>Facade</code> instance of the object has well been declared
                 * during its construction.
                 *
                 * @return
                 * 		<code>Facade</code> instance of the object has well been declared during its
                 * 		construction.
                 */
                MediatorTestSub.prototype.hasFacade = function () {
                    return this.facade instanceof puremvc.Facade;
                };
                return MediatorTestSub;
            }(puremvc.Mediator));
            test.MediatorTestSub = MediatorTestSub;
        })(test || (test = {}));
        ///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='MediatorTestSub.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * Test the PureMVC Mediator class.
             */
            var MediatorTest = /** @class */ (function () {
                function MediatorTest() {
                    /**
                     * The name of the test case - if not provided, one is automatically generated by the
                     * YUITest framework.
                     */
                    this.name = "PureMVC Mediator class tests";
                }
                /**
                 * Tests if constructing the Mediator also call its super by testing for the existence of
                 * its <code>Notifier</code> superclass facade instance.
                 */
                MediatorTest.prototype.testConstructor = function () {
                    // Create a new subclass of Notifier and verify that its facade
                    // has well been created
                    var mediatorTestSub = new test.MediatorTestSub();
                    // test assertions
                    YUITest.Assert.isTrue(mediatorTestSub.hasFacade(), "Expecting mediatorTestSub.hasFacade() === true");
                };
                /**
                 * Tests getting the name using Mediator class accessor method.
                 */
                MediatorTest.prototype.testNameAccessor = function () {
                    // Create a new Mediator and use accessors to set the mediator name
                    var mediator = new puremvc.Mediator();
                    // test assertions
                    YUITest.Assert.areEqual(puremvc.Mediator.NAME, mediator.getMediatorName(), "Expecting mediator.getMediatorName() == Mediator.NAME");
                };
                /**
                 * Tests getting the name using Mediator class accessor method.
                 */
                MediatorTest.prototype.testViewAccessor = function () {
                    // Create a view object
                    var view = new Object();
                    // Create a new Proxy and use accessors to set the proxy name
                    var mediator = new puremvc.Mediator(puremvc.Mediator.NAME, view);
                    // test assertions
                    YUITest.Assert.isNotNull(mediator.getViewComponent(), "Expecting mediator.getViewComponent() !== null");
                };
                return MediatorTest;
            }());
            test.MediatorTest = MediatorTest;
        })(test || (test = {}));
        ///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * Test the PureMVC Notification class.
             */
            var NotificationTest = /** @class */ (function () {
                function NotificationTest() {
                    /**
                     * The name of the test case - if not provided, one is automatically generated by the
                     * YUITest framework.
                     */
                    this.name = "PureMVC Notification class tests";
                }
                /**
                 * Tests setting and getting the name using Notification class accessor methods.
                 */
                NotificationTest.prototype.testNameAccessors = function () {
                    // Create a new Notification and use accessors to set the notification name
                    var notification = new puremvc.Notification('TestNote');
                    // test assertions
                    YUITest.Assert.areEqual('TestNote', notification.getName(), "Expecting notification.getName() == 'TestNote'");
                };
                /**
                 * Tests setting and getting the body using Notification class accessor methods.
                 */
                NotificationTest.prototype.testBodyAccessors = function () {
                    // Create a new Notification and use accessors to set the body
                    var notification = new puremvc.Notification(null);
                    notification.setBody(5);
                    // test assertions
                    YUITest.Assert.areSame(5, notification.getBody(), "Expecting notification.getBody() === 5");
                };
                /**
                 * Tests setting the name and body using the Notification class constructor.
                 */
                NotificationTest.prototype.testConstructor = function () {
                    // Create a new Notification using the Constructor to set the notification name and body.
                    var notification = new puremvc.Notification('TestNote', 5, 'TestNoteType');
                    // test assertions
                    YUITest.Assert.areEqual("TestNote", notification.getName(), "Expecting notification.getName() == 'TestNote'");
                    YUITest.Assert.areSame(5, notification.getBody(), "Expecting notification.getBody() === 5");
                    YUITest.Assert.areEqual("TestNoteType", notification.getType(), "Expecting notification.getType() == 'TestNoteType'");
                };
                /**
                 * Tests the toString method of the notification.
                 */
                NotificationTest.prototype.testToString = function () {
                    // Create a new Notification and use accessors to set the notification name.
                    var notification = new puremvc.Notification('TestNote', [1, 3, 5], 'TestType');
                    var ts = "Notification Name: TestNote\nBody:1,3,5\nType:TestType";
                    // test assertions
                    YUITest.Assert.areEqual(ts, notification.toString(), "Expecting notification.testToString() == '" + ts + "'");
                };
                return NotificationTest;
            }());
            test.NotificationTest = NotificationTest;
        })(test || (test = {}));
        var test;
        (function (test) {
            "use strict";
            /**
             * A utility class used by <code>NotifierTest</code>.
             */
            var NotifierTestVO = /** @class */ (function () {
                /**
                 * Constructs a <code>NotifierTestVO</code> instance.
                 *
                 * @param input
                 * 		The number to be fed to the FacadeTestCommand
                 */
                function NotifierTestVO(input) {
                    /**
                     * Will be used to store the number to pass to the command.
                     */
                    this.input = null;
                    /**
                     * Will be used to read the result calculated by the command.
                     */
                    this.result = null;
                    this.input = input;
                }
                return NotifierTestVO;
            }());
            test.NotifierTestVO = NotifierTestVO;
        })(test || (test = {}));
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='NotifierTestVO.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A <code>SimpleCommand</code> subclass used by <code>NotifierTest</code>.
             */
            var NotifierTestCommand = /** @class */ (function (_super) {
                __extends(NotifierTestCommand, _super);
                function NotifierTestCommand() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * Fabricate a result by multiplying the input by 2
                 *
                 * @param notification
                 * 		The Notification carrying the NotifierTestVO
                 */
                NotifierTestCommand.prototype.execute = function (notification) {
                    var vo = notification.getBody();
                    // Fabricate a result
                    vo.result = 2 * vo.input;
                };
                return NotifierTestCommand;
            }(puremvc.SimpleCommand));
            test.NotifierTestCommand = NotifierTestCommand;
        })(test || (test = {}));
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A <code>Notifier</code> utility subclass used by <code>NotifierTest</code>.
             */
            var NotifierTestSub = /** @class */ (function (_super) {
                __extends(NotifierTestSub, _super);
                function NotifierTestSub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * A method to test if <code>Facade</code> instance of the object has well been declared
                 * during its construction.
                 *
                 * @return
                 * 		<code>Facade</code> instance of the object has well been declared during its
                 * 		construction.
                 */
                NotifierTestSub.prototype.hasFacade = function () {
                    return this.facade instanceof puremvc.Facade;
                };
                return NotifierTestSub;
            }(puremvc.Notifier));
            test.NotifierTestSub = NotifierTestSub;
        })(test || (test = {}));
        ///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='NotifierTestCommand' />
        ///<reference path='NotifierTestSub' />
        ///<reference path='NotifierTestVO' />
        var test;
        (function (test) {
            "use strict";
            /**
             * Test the PureMVC Notifier class.
             */
            var NotifierTest = /** @class */ (function () {
                function NotifierTest() {
                    /**
                     * The name of the test case - if not provided, one is automatically generated by the
                     * YUITest framework.
                     */
                    this.name = "PureMVC Notifier class tests";
                }
                /**
                 * Tests if constructing the Notifier also create a facade instance.
                 */
                NotifierTest.prototype.testConstructor = function () {
                    // Create a new subclass of Notifier and verify that its facade
                    // has well been created
                    var notifierTestSub = new test.NotifierTestSub();
                    // test assertions
                    YUITest.Assert.isTrue(notifierTestSub.hasFacade(), "Expecting notifierTestSub.hasFacade() === true");
                };
                /**
                 * Tests sending a Notification from the Notifier.
                 */
                NotifierTest.prototype.testSendNotification = function () {
                    // Create the Facade, register the FacadeTestCommand to
                    // handle 'NotifierTest' notifications
                    var facade = puremvc.Facade.getInstance();
                    facade.registerCommand('NotifierTestNote', test.NotifierTestCommand);
                    // Send notification. The Command associated with the event
                    // (NotifierTestCommand) will be invoked, and will multiply
                    // the vo.input value by 2 and set the result on vo.result
                    var vo = new test.NotifierTestVO(32);
                    facade.sendNotification('NotifierTestNote', vo);
                    // test assertions
                    YUITest.Assert.areEqual(64, vo.result, "Expecting vo.result == 64");
                };
                return NotifierTest;
            }());
            test.NotifierTest = NotifierTest;
        })(test || (test = {}));
        ///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * Tests PureMVC Observer class.
             *
             * Since the Observer encapsulates the interested object's callback information, there are no
             * getters, only setters. It is, in effect write-only memory.
             *
             * Therefore, the only way to test it is to set the notification method and context and call the
             * notifyObserver method.
             */
            var ObserverTest = /** @class */ (function () {
                function ObserverTest() {
                    /**
                     * The name of the test case - if not provided, one is automatically generated by the
                     * YUITest framework.
                     */
                    this.name = "PureMVC Observer class tests";
                    /**
                     * A test variable that proves the notify method was executed with 'this' as its execution
                     * context.
                     */
                    this.observerTestVar = -1;
                }
                /**
                 * Tests observer class when initialized by accessor methods.
                 */
                ObserverTest.prototype.testObserverAccessors = function () {
                    /*
                     * Create observer with null args, then use accessors to set notification method and
                     * context.
                     */
                    var observer = new puremvc.Observer(null, null);
                    observer.setNotifyContext(this);
                    observer.setNotifyMethod(this.observerTestMethod);
                    /*
                     * Create a test event, setting a payload value and notify the observer with it. since
                     * the observer is this class and the notification method is observerTestMethod,
                     * successful notification will result in our local observerTestVar being set to the
                     * value we pass in on the notification body.
                     */
                    var notification = new puremvc.Notification('ObserverTestNote', 10);
                    observer.notifyObserver(notification);
                    // test assertions
                    YUITest.Assert.areSame(10, this.observerTestVar, "Expecting observerTestVar === 10");
                };
                /**
                 * Tests observer class when initd by constructor.
                 */
                ObserverTest.prototype.testObserverConstructor = function () {
                    // Create observer passing in notification method and context.
                    var observer = new puremvc.Observer(this.observerTestMethod, this);
                    /*
                     * Create a test notification, setting a body value and notify the observer with it. since the
                     * observer is this class and the notification method is observerTestMethod, successful
                     * notification will result in our local observerTestVar being set to the value we pass
                     * in on the notification body.
                     */
                    var notification = new puremvc.Notification('ObserverTestNote', 5);
                    observer.notifyObserver(notification);
                    // test assertions
                    YUITest.Assert.areSame(5, this.observerTestVar, "Expecting observerTestVar === 5");
                };
                /**
                 * Tests the compareNotifyContext method of the Observer class.
                 */
                ObserverTest.prototype.testCompareNotifyContext = function () {
                    // Create observer passing in notification method and context
                    var observer = new puremvc.Observer(this.observerTestMethod, this);
                    var negTestObj = new Object();
                    // test assertions
                    YUITest.Assert.isFalse(observer.compareNotifyContext(negTestObj), "Expecting observer.compareNotifyContext(negTestObj) === false");
                    YUITest.Assert.isTrue(observer.compareNotifyContext(this), "Expecting observer.compareNotifyContext(this) === true");
                };
                /**
                 * A function that is used as the observer notification method.
                 *
                 * @param notification
                 *		The <code>Notification</code> used to test that <code>Observer</code> is well
                 *		notified.
                 */
                ObserverTest.prototype.observerTestMethod = function (notification) {
                    this.observerTestVar = notification.getBody();
                };
                return ObserverTest;
            }());
            test.ObserverTest = ObserverTest;
        })(test || (test = {}));
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * A <code>Proxy</code> utility subclass used by <code>ProxyTest</code>.
             */
            var ProxyTestSub = /** @class */ (function (_super) {
                __extends(ProxyTestSub, _super);
                function ProxyTestSub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                /**
                 * A method to test if <code>Facade</code> instance of the object has well been declared
                 * during its construction.
                 *
                 * @return
                 *		<code>Facade</code> instance of the object has well been declared during its
                 *		construction.
                 */
                ProxyTestSub.prototype.hasFacade = function () {
                    return this.facade instanceof puremvc.Facade;
                };
                return ProxyTestSub;
            }(puremvc.Proxy));
            test.ProxyTestSub = ProxyTestSub;
        })(test || (test = {}));
        ///<reference path='../../../../../../../test/lib/YUITest.d.ts'/>
        ///<reference path='../../../../../../../bin/puremvc-typescript-standard-1.0.d.ts'/>
        ///<reference path='ProxyTestSub.ts'/>
        var test;
        (function (test) {
            "use strict";
            /**
             * Test the PureMVC Proxy class.
             */
            var ProxyTest = /** @class */ (function () {
                function ProxyTest() {
                    /**
                     * The name of the test case - if not provided, one is automatically generated by the
                     * YUITest framework.
                     */
                    this.name = "PureMVC Proxy class tests";
                }
                /**
                 * Tests if constructing the Proxy also call its super by testing for the existence of its
                 * <code>Notifier</code> superclass facade instance.
                 */
                ProxyTest.prototype.testConstructorInitialization = function () {
                    // Create a new subclass of Notifier and verify that its facade has well been created.
                    var proxyTestSub = new test.ProxyTestSub();
                    // test assertions
                    YUITest.Assert.isTrue(proxyTestSub.hasFacade(), "Expecting proxyTestSub.hasFacade() === true");
                };
                /**
                 * Tests create a new Proxy using the constructor to set the name and data.
                 */
                ProxyTest.prototype.testConstructor = function () {
                    // Create a new Proxy using the Constructor to set the name and data
                    var proxy = new puremvc.Proxy('colors', ['red', 'green', 'blue']);
                    var data = proxy.getData();
                    // test assertions
                    YUITest.Assert.isNotNull(proxy, "Expecting proxy !== null");
                    YUITest.Assert.areEqual('colors', proxy.getProxyName(), "Expecting proxy.getProxyName() == 'colors'");
                    YUITest.Assert.areEqual(3, data.length, "Expecting data.length == 3");
                    YUITest.Assert.areEqual('red', data[0], "Expecting data[0] == 'red'");
                    YUITest.Assert.areEqual('green', data[1], "Expecting data[1] == 'green'");
                    YUITest.Assert.areEqual('blue', data[2], "Expecting data[2] == 'blue'");
                };
                /**
                 * Tests getting the name using Proxy class accessor method. Setting can only be done in
                 * constructor.
                 */
                ProxyTest.prototype.testNameAccessor = function () {
                    // Create a new Proxy and use accessors to set the proxy name
                    var proxy = new puremvc.Proxy('TestProxy');
                    // test assertions
                    YUITest.Assert.areEqual('TestProxy', proxy.getProxyName(), "Expecting proxy.getProxyName() == 'TestProxy'");
                };
                /**
                 * Tests setting and getting the data using Proxy class accessor
                 * methods.
                 */
                ProxyTest.prototype.testDataAccessors = function () {
                    // Create a new Proxy and use accessors to set the data
                    var proxy = new puremvc.Proxy('colors');
                    proxy.setData(['red', 'green', 'blue']);
                    var data = proxy.getData();
                    // test assertions
                    YUITest.Assert.areEqual(3, data.length, "Expecting data.length == 3");
                    YUITest.Assert.areEqual('red', data[0], "Expecting data[0] == 'red'");
                    YUITest.Assert.areEqual('green', data[1], "Expecting data[1] == 'green'");
                    YUITest.Assert.areEqual('blue', data[2], "Expecting data[2] == 'blue'");
                };
                return ProxyTest;
            }());
            test.ProxyTest = ProxyTest;
        })(test || (test = {}));
        
		return test;
	});
}