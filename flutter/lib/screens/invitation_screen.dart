import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../providers/interview_provider.dart';
import '../widgets/candidate_info_item.dart';
import '../widgets/invitation_form.dart';

class InvitationScreen extends StatelessWidget {
  static const routeName = '/invitation_screen';

  void startAddNewCandidate(BuildContext ctx) {
    showModalBottomSheet(
        context: ctx,
        builder: (bctx) {
          return InvitationForm();
        });
  }

  @override
  Widget build(BuildContext context) {
    final candidateInfo = Provider.of<Interviews>(context);
    final candidates = candidateInfo.items;
    return Scaffold(
      appBar: AppBar(
        title: Text(ModalRoute.of(context)!.settings.arguments as String),
      ),
      body: ListView.builder(
        itemBuilder: (ctx, i) => CandidateInfoItem(
            email: candidates[i].email,
            name: candidates[i].name,
            phoneNumber: candidates[i].phone),
        itemCount: candidates.length,
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          startAddNewCandidate(context);
        },
        child: Icon(Icons.add),
      ),
    );
  }
}