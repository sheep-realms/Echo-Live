let obsTutorial = new OBSTutorial();
obsTutorial.init();
const driver = window.driver.js.driver;

function driverShowTest() {
    obsTutorial.init();
    let driverObj = {};
    let elementData = [
        null,
        null,
        '.panel-source',
        '#btn-source-add'
    ];
    let popoverData = [
        null,
        null,
        null,
        {
            onNextClick: () => {
                obsTutorial.addSource('对话框', 'browser', 'source-item-portal');
                driverObj.moveNext();
            }
        }
    ];

    driverObj = driver(
        EchoLiveTools.generateDriverData(
            {
                onDestroyStarted: () => {
                    driverObj.destroy();
                    obsTutorial.stop();
                }
            },
            EchoLiveTools.generateDriverSteps('obs_tutorial_install_portal', 3, elementData, popoverData)
        )
    );

    obsTutorial.start(driverObj.drive);
}