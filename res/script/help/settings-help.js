let helpKey = EchoLiveTools.getUrlParam('help');
const driver = window.driver.js.driver;

if (helpKey != null && helpKey != undefined) {
    switch (helpKey) {
        case 'overview':
            driverShowOverview();
            break;
    
        default:
            break;
    }
}

function driverShowOverview() {
    $('.settings-nav-item[data-pageid="global"]').click();
    $('#tabpage-nav-import').click();
    let driverObj = {};
    let elementData = [
        null,
        null,
        null,
        '#echo-editor-nav',
        null,
        '#settings-file-input-box',
        '#settings-file-check-box',
        null,
        '#echo-settings-nav',
        '.settings-item[data-id="global.theme"]',
        '.settings-item[data-id="global.theme"]',
        '.tabpage-panel[data-pageid="edit"] .settings-controller-bottom',
        '.tabpage-panel[data-pageid="edit"] .settings-controller-bottom',
        '.settings-item[data-id="global.color_scheme"]',
        null,
        '.tabpage-panel[data-pageid="export"]',
        '#edit-btn-output',
        '#echo-settings-nav .settings-nav-item[data-pageid="accessible"]'
    ];
    let popoverData = [
        null,
        null,
        null,
        null,
        null,
        {
            side: 'top'
        }, {
            onNextClick: () => {
                $('.settings-item[data-id="global.color_scheme"]').addClass('settings-item-update');
                $('#tabpage-nav-edit').click();
                driverObj.moveNext();
            }
        },
        null,
        {
            side: 'right'
        }, {
            onNextClick: () => {
                setSettingsItemValue('global.theme', 'void');
                $('.settings-item[data-id="global.theme"] .settings-value').trigger('input');
                driverObj.moveNext();
            }
        },
        null,
        {
            side: 'top'
        }, {
            side: 'top'
        },
        {
            onNextClick: () => {
                $('#tabpage-nav-export').click();
                $('.settings-item[data-id="global.color_scheme"]').removeClass('settings-item-update');
                $('#edit-btn-undo').click();
                driverObj.moveNext();
            }
        },
        null,
        null,
        {
            side: 'top',
            onNextClick: () => {
                $('#tabpage-nav-edit').click();
                $('.settings-nav-item[data-pageid="accessible"]').click();
                driverObj.moveNext();
            }
        }, {
            side: 'right',
            onNextClick: () => {
                $('#tabpage-nav-edit').click();
                $('.settings-nav-item[data-pageid="about"]').click();
                driverObj.moveNext();
            }
        }
    ];

    driverObj = driver(
        EchoLiveTools.generateDriverData(
            {},
            EchoLiveTools.generateDriverSteps('settings_overview', 18, elementData, popoverData)
        )
    );
    driverObj.drive();
}