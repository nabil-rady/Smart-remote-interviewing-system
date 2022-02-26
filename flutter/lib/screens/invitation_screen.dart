import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import '../widgets/candidate_info_item.dart';
import '../widgets/invitation_form.dart';
import '../providers/candidate_provider.dart';

class InvitationScreen extends StatelessWidget {
  static const routeName = '/invitation_screen';

  void startAddNewCandidate(BuildContext ctx, String id) {
    showModalBottomSheet(
        context: ctx,
        builder: (bctx) {
          return InvitationForm(id);
        });
  }

  @override
  Widget build(BuildContext context) {
    final candidateInfo = Provider.of<Candidates>(context);
    final candidates = candidateInfo.candidates;
    final _position =
        ModalRoute.of(context)!.settings.arguments as List<String>;
    final _positioName = _position[0];
    final _positionId = _position[1];
    return Scaffold(
      appBar: AppBar(
        title: const Text('Invite Applicant'),
        backgroundColor: Theme.of(context).primaryColor,
      ),
      body: ListView.builder(
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
          startAddNewCandidate(context, _positionId);
        },
        child: const Icon(
          Icons.add,
        ),
      ),
    );
  }
}
