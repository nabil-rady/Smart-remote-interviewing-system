import 'package:flutter/material.dart';
import 'package:graduation_project/local/sharedpreferences.dart';
import 'package:provider/provider.dart';
import '../providers/positions.dart';

class PositionItem extends StatelessWidget {
  final String positionName;
  final String positionId;

  PositionItem(this.positionName, this.positionId);
  @override
  Widget build(BuildContext context) {
    late Future detailsFuture;
    return Padding(
      padding: const EdgeInsets.all(8),
      child: InkWell(
        onTap: () {
          // Navigator.of(context)
          //     .pushNamed(InvitationScreen.routeName, arguments: position);
          detailsFuture = getPositionDetails(context, positionId);
          Navigator.of(context).pushNamed('/after_positions_screen',
              arguments: [positionName, positionId, detailsFuture]);
        },
        child: Card(
          child: Row(
            children: <Widget>[
              Expanded(
                child: Container(
                  constraints: const BoxConstraints(
                    maxHeight: double.infinity,
                  ),
                  child: Padding(
                    child: Text(positionName),
                    padding: const EdgeInsets.only(bottom: 5, top: 5, left: 8),
                  ),
                ),
              ),
              IconButton(
                onPressed: () {
                  Provider.of<Positions>(context, listen: false)
                      .removePosition(positionId);
                },
                icon: const Icon(Icons.delete),
                color: Colors.red,
              )
            ],
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
          ),
        ),
      ),
    );
  }
}
