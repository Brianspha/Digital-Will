import EmbarkJS from 'Embark/EmbarkJS';
import Client from 'Embark/contracts/Client';
import Lawyer from 'Embark/contracts/Lawyer';
import Advertisment from 'Embark/contracts/Advertisment';
import $ from 'jquery';
import JSAlert from "js-alert"

// import your contracts
// e.g if you have a contract named SimpleStorage:
//import SimpleStorage from 'Embark/contracts/SimpleStorage';

EmbarkJS.onReady(() => {
    $(document).ready(() => {

        web3.eth.getAccounts().then((e) => {
            const acc = e[1];
            Lawyer.methods.register("Jaco", "Tae", "3182973981273", "askjdhas121230").send({
                from: acc,
                gas: 4000000
            }).then(function (val, err) {
                if (err) {
                    //      JSAlert.alert('Something went wrong!');
                    return;
                }
                //JSAlert.alert("Succesfully registered Lawyer");
            })
        })
        $("#signUpButton").click(function () {
            var name = document.getElementById("fname").value;
            var lname = document.getElementById("lname").value;
            var id = document.getElementById("ID").value;
            web3.eth.getAccounts().then((e) => {
                const acc = e[0];
                Client.methods.register(name, lname, id).send({
                    from: acc,
                    gas: 4000000
                }).then(function (val, err) {
                    if (err) {
                        JSAlert.alert('Something went wrong!');
                        return;
                    }
                    JSAlert.alert("Succesfully registered Client");
                })

            })
        })
        $("#showProfile").click(function () {
            var name = document.getElementById("name1");
            var lname = document.getElementById("lname1");
            var id = document.getElementById("ID1");
            web3.eth.getAccounts().then((e) => {
                const acc = e[0];
                Client.methods.showProfile().call({
                    from: acc,
                    gas: 4000000
                }).then(function (val, err) {
                    if (err) {
                        JSAlert.alert('Something went wrong!');
                        return;
                    }
                    var name1, lname1, id1;
                    name1, lname1, id1 = val;
                    name.value = val.Name;
                    lname.value = val.Lname;
                    id.value = val.Id;
                })

            })
        })

        $("#editClient").click(function () {
            var name = document.getElementById("name2").value;
            var lname = document.getElementById("lname2").value;
            var id = document.getElementById("ID2").value;
            web3.eth.getAccounts().then((e) => {
                const acc = e[0];
                Client.methods.editProfile(name, lname, id).send({
                    from: acc,
                    gas: 4000000
                }).then(function (val, err) {
                    if (err) {
                        JSAlert.alert('Something went wrong!');
                        return;
                    }
                    JSAlert.alert("Succesfully updated profile Client");
                })

            })
        })

        $("#done").click(function () {
            var will = document.getElementById("Will").value;
            var Additional = document.getElementById("textarea1").value;
            var assets = document.getElementById("asset").value;
            var ben1 = document.getElementById("fname2").value;
            var ben2 = document.getElementById("lname2").value;
            var id = document.getElementById("ID2").value;
            var beneficiaries1 = ben1 + " " + ben2 + id;
            var add = "";
            web3.eth.getAccounts().then((e) => {
                const acc = e[0];
                Client.methods.createWill(will + " Additional " + Additional, assets, beneficiaries1).send({
                    from: acc,
                    gas: 4000000
                }).then(function (val, err) {
                    if (err) {
                        JSAlert.alert('Something went wrong!');
                        return;
                    }
                    Lawyer.methods.RequestWillApproval(0, e[1]).send({
                        from: e[1],
                        gas: 4000000
                    }).then(function (val, err) {
                        if (err) {
                            JSAlert.alert('Something went wrong!');
                            return;
                        }
                        Client.methods.showProfile().call({
                            from: acc,
                            gas: 4000000
                        }).then(function (val, err) {
                            if (err) {
                                JSAlert.alert('Something went wrong!');
                                return;
                            }
                            Lawyer.methods.Accept(0).send({from:e[1],gas:4000000}).then(function(val,err){
                                  if(err)
                                  {
                                      JSAlert.alert("Oh no Something Went Wrong!");
                                      return;
                                  }
                                  var template_params = {
                                    "reply_to": "g14m1190@campus.ru.ac.za",
                                    "from_name": "Digital Will ",
                                    "message_html": "Dear Mjoli <br>" + "Mr. " + val.Lname + " has listed you as a witness for his will please click on the below link to view and sign the will <br> <a href='localhost:8000/test.html'>localhost:8000/test.html</a> <br> <b>Please note that the link will expire after 24 hours after you will not be able to sign </b> <br> Best wishes <br> Digital Will Team"
                                }  
                            var service_id = "default_service";
                            var template_id = "template_kkkimEZT";
                            emailjs.send(service_id, template_id, template_params).then(function () {
                                window.location = "lawyerList.html";
                            });  

                            })
                           

                            // window.location = "clientPortal.html";
                        })
                    })
                })

            })
        })

        $("#editWill").click(function () {

            var will = document.getElementById("fname");
            var will = document.getElementById("Will");
            var will = document.getElementById("Will");
            var Additional = document.getElementById("Additional");
            var assets = document.getElementById("Text1");
            var beneficiaries = document.getElementById("Text2");
            var id = document.getElementById("ID2");
            var add = "";
            web3.eth.getAccounts().then((e) => {
                const acc = e[0];
                Client.methods.viewWill().call({
                    from: acc,
                    gas: 4000000
                }).then(function (val, err) {
                    if (err) {
                        JSAlert.alert('Something went wrong!');
                        return;
                    }
                    var Name, Lname, asset, ben, Will;
                    Name = val.Name;
                    Lname = val.Lname;
                    asset = val.asset;
                    ben = val.bene;
                    var split = val.will3.split("Additional");
                    Will = split[0];
                    var add = Will.split("Additional")[1];
                    will.innerHTML = Will;
                    Additional.innerHTML = split[1];
                    beneficiaries.innerHTML = ben;
                    assets.innerHTML = asset;
                })

            })
        })

        $("#updateWill").click(function (e) {
            var will = document.getElementById("Will").value;
            var Additional = document.getElementById("Additional").value;
            var assets = document.getElementById("Text1").value;
            var beneficiaries = document.getElementById("Text2").value;
            var id = document.getElementById("ID2").value;
            var add = "";
            web3.eth.getAccounts().then((e) => {
                const acc = e[0];
                Client.methods.editWill(0, will, assets, beneficiaries).send({
                    from: acc,
                    gas: 4000000
                }).then(function (val, err) {
                    if (err) {
                        JSAlert.alert('Something went wrong!');
                        return;
                    }
                    web3.eth.getAccounts().then((e) => {
                        const acc = e[1];
                        Lawyer.methods.RequestWillApproval(0, acc).send({
                            from: acc,
                            gas: 4000000
                        }).then(function (val, err) {
                            if (err) {
                                JSAlert.alert('Something went wrong!');
                                return;
                            }
                            Client.methods.showProfile().call({
                                from: acc,
                                gas: 4000000
                            }).then(function (val, err) {
                                if (err) {
                                    JSAlert.alert('Something went wrong!');
                                    return;
                                }
                                var template_params = {
                                    "reply_to": "g14m1190@campus.ru.ac.za",
                                    "from_name": "Digital Will ",
                                    "message_html": "Dear Mjoli <br>" + "Mr. " + val.Lname + " has listed you as a witness for his will please click on the below link to view and sign the will <br> <a href='localhost:8000/test.html'>localhost:8000/test.html</a> <br> <b>Please note that the link will expire after 24 hours after you will not be able to sign </b> <br> Best wishes <br> Digital Will Team"
                                }
                                var service_id = "default_service";
                                var template_id = "template_kkkimEZT";
                                emailjs.send(service_id, template_id, template_params);

                            })
                        })
                    })
                })

            })
        })

        $("#refrViewWill").click(function (e) {
            e.preventDefault();
            var will = document.getElementById("Will");
            var Additional = document.getElementById("textarea1");
            var assets = document.getElementById("asset");
            var fname = document.getElementById("fname2");
            var lname = document.getElementById("lname2");
            var id = document.getElementById("ID2");
            web3.eth.getAccounts().then((e) => {
                const acc = e[0];
                Client.methods.viewWill().call({
                    from: acc,
                    gas: 4000000
                }).then(function (val, err) {
                    if (err) {
                        JSAlert.alert('Something went wrong!');
                        return;
                    }
                    var Name, Lname, asset, ben, Will;
                    Name = val.Name;
                    Lname = val.Lname;
                    asset = val.asset.split(" ");
                    ben = val.bene.split(" ");
                    Will = val.will3;
                    var split = Will.split(" Additional ");
                    var count = 1;
                    will.innerHTML = split[0];
                    fname.value = Name;
                    lname.value = Lname;
                    assets.value = asset;
                    Additional.value = split[0];
                    id.value = acc.toString();
                    
                })

            })
        })
        $("#Lsend").click(function () {
            var name = document.getElementById("Lname").value;
            var lname = document.getElementById("Llname").value;
            var id = document.getElementById("LID").value;
            var Lid = document.getElementById("LawID").value;
            web3.eth.getAccounts().then((e) => {
                const acc = e[1];
                Lawyer.methods.register(name, lname, id, Lid).send({
                    from: acc,
                    gas: 4000000
                }).then(function (val, err) {
                    if (err) {
                        JSAlert.alert('Something went wrong!');
                        return;
                    }
                    JSAlert.alert("Succesfully registered Lawyer");
                })
            })
        })
        $("#acceptWill").click(function () {
            web3.eth.getAccounts().then((e) => {
                const acc = e[1];
                Lawyer.methods.Accept(0).send({
                    from: acc,
                    gas: 4000000
                }).then(function (val, err) {
                    if (err) {
                        JSAlert.alert('Something went wrong!');
                        return;
                    }
                    var template_params = {
                        "reply_to": "g14m1190@campus.ru.ac.za",
                        "from_name": "Digital Will ",
                        "message_html": "Dear user <br>" + "Your will has been approved <br> Than you for using Digital Will. <br> <b>Best wishes</b> <br> Digital Will Team"
                    }
                    var service_id = "default_service";
                    var template_id = "template_kkkimEZT";
                    emailjs.send(service_id, template_id, template_params);
                    JSAlert.alert('Will signed and stored on the Blockchain!');
                })
            })
        })

    })
});