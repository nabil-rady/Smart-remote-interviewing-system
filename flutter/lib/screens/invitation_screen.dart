import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../widgets/candidate_info_item.dart';
import '../widgets/invitation_form.dart';
import '../providers/candidate_provider.dart';

class InvitationScreen extends StatefulWidget {
  static const routeName = '/invitation_screen';

  final String positionId;
  final String positionName;
  const InvitationScreen(
      {Key? key, required this.positionId, required this.positionName})
      : super(key: key);
  @override
  State<InvitationScreen> createState() => _InvitationScreenState();
}

class _InvitationScreenState extends State<InvitationScreen> {
  bool myflag = true;
  @override
  void startAddNewCandidate(BuildContext ctx, String id) {
    showModalBottomSheet(
        isScrollControlled: true,
        context: ctx,
        builder: (bctx) {
          return InvitationForm(id);
        });
  }

  @override
  void didChangeDependencies() {
    if (myflag) {
      Provider.of<Candidates>(context).setItems = [];
      Provider.of<Candidates>(context).setCandidatesUI = [];
      Provider.of<Candidates>(context).fetchAndSetCandidates(widget.positionId);
    }
    // TODO: implement didChangeDependencies
    myflag = false;

    super.didChangeDependencies();
  }

  @override
  Widget build(BuildContext context) {
    Provider.of<Candidates>(context, listen: false).setcsvCandidateList = [];
    final candidateInfo = Provider.of<Candidates>(context);
    final candidates = candidateInfo.candidatesUI;
    // final _position =
    //     ModalRoute.of(context)!.settings.arguments as List<String>;
    // final _positioName = _position[0];
    // final _positionId = _position[1];
    return Scaffold(
      appBar: AppBar(
        title: const Text('Invite Applicant'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: candidates.isEmpty
          ? Padding(
              padding: const EdgeInsets.all(20),
              child: Center(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Image.asset(
                      'assets/images/invite2.png',
                      height: 120,
                      width: 120,
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                    const Text(
                      'Welcome to Vividly',
                      style: TextStyle(
                          fontWeight: FontWeight.bold, color: Colors.grey),
                    ),
                    const Text(
                      'No Applicants Yet, Please Invite More People',
                      style: TextStyle(
                        fontSize: 18,
                        color: Colors.grey,
                      ),
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(
                      height: 20,
                    )
                  ],
                ),
              ),
            )
          : ListView.builder(
              itemBuilder: (ctx, i) => CandidateInfoItem(
                  email: candidates[i]['email'],
                  name: candidates[i]['name'],
                  phoneCode: candidates[i]['phoneCode'],
                  phoneNumber: candidates[i]['phoneNumber']),
              itemCount: candidates.length,
            ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton(
        backgroundColor: Theme.of(context).primaryColor,
        onPressed: () {
          startAddNewCandidate(context, widget.positionId);
        },
        child: const Icon(
          Icons.add,
        ),
      ),
    );
  }
}
